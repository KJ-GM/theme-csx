import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
  useColorScheme,
  DynamicColorIOS,
  Platform,
  type ColorValue,
  StyleSheet,
} from 'react-native';

// Types
type ThemeMode = 'light' | 'dark' | 'system';

// Enhanced type definitions for better type safety
type ColorSet<T extends string = string> = Record<T, string>;

type RequiredThemeConfig<T extends string = string> = {
  colors: {
    light: ColorSet<T>;
    dark?: Partial<ColorSet<T>>; // Optional and partial
  };
};

let isThemeInitialized = false;
const DEFAULT_STORAGE_KEY = 'app-theme-mode';

// Helper function to merge light and dark colors
function createCompleteDarkColors<T extends string>(
  lightColors: ColorSet<T>,
  darkColors?: Partial<ColorSet<T>>
): ColorSet<T> {
  if (!darkColors) {
    return lightColors;
  }
  return { ...lightColors, ...darkColors };
}

// Enhanced iOS-only dynamic color calculation using the helper function
const calculateDynamicIOSColors = <T extends RequiredThemeConfig<any>>(
  config: T,
  completeDarkColors: ColorSet<any>
) => {
  const { colors } = config;
  if (!colors.light) {
    return null;
  }

  return Object.fromEntries(
    Object.keys(colors.light).map((key) => [
      key,
      DynamicColorIOS({
        light: colors.light[key] as ColorValue,
        dark: completeDarkColors[key] as ColorValue,
      }),
    ])
  );
};

export function createAppTheme<T extends RequiredThemeConfig>(
  config: T,
  options: {
    storage?: boolean; // ✅ Use MMKV only if true
  } = { storage: false } // Set default value here
) {
  if (__DEV__ && !isThemeInitialized) {
    console.info(`
\x1b[32m🎨 [theme-csx] Theme system initialized\x1b[0m
\x1b[36mDocs:\x1b[0m https://github.com/KJ-GM/theme-csx
    `);
    isThemeInitialized = true;
  }

  if (__DEV__) {
    validateThemeConfig(config);
    if (options?.storage === true) {
      console.log(
        ' [theme-csx] Storage enabled - theme mode will persist using MMKV'
      );
    }
  }

  // Type for the resolved theme colors - combines light colors with dark overrides
  type ResolvedColors = T['colors']['light'];
  type Theme = {
    colorMode: 'light' | 'dark';
    colors: ResolvedColors;
  } & Omit<T, 'colors'>;

  // Pre-compute complete dark theme by merging with light theme - only computed once
  const completeDarkTheme = createCompleteDarkColors(
    config.colors.light,
    config.colors.dark
  );

  // Pre-compute iOS dynamic colors using the computed dark theme
  const dynamicIOSColors =
    Platform.OS === 'ios'
      ? calculateDynamicIOSColors(config, completeDarkTheme)
      : null;

  const ThemeContext = createContext<Theme | undefined>(undefined);
  const ModeContext = createContext<ThemeMode>('system');
  const SetModeContext = createContext<((mode: ThemeMode) => void) | null>(
    null
  );
  const ResetModeContext = createContext<(() => void) | null>(null);

  const AppThemeProvider = ({
    children,
    defaultMode = 'system',
    fallbackTheme = 'light',
  }: {
    children: ReactNode;
    defaultMode?: ThemeMode;
    fallbackTheme?: 'light' | 'dark';
  }) => {
    const systemColorScheme = useColorScheme();
    const isStorageEnabled = options?.storage !== false;

    const storageKey = DEFAULT_STORAGE_KEY;
    const storage = useMemo(() => {
      if (!isStorageEnabled) return null;
      try {
        const { MMKV } = require('react-native-mmkv');
        return new MMKV(); // ✅ Created once per component mount
      } catch (err) {
        if (__DEV__) {
          console.log(
            '[theme-csx] MMKV not found – enable storage only if MMKV is installed.'
          );
          // Custom error message (formatted clearly)
          const errorMessage = `
        [theme-csx] MMKV Required but Not Installed
        ==============================
        You enabled theme persistence (storage: true), but 'react-native-mmkv' is missing.

        Solutions:
        1. Install MMKV: yarn add react-native-mmkv
        2. Disable storage: createAppTheme(config, { storage: false })
        
        Note: Storage is disabled by default
      `.replace(/^\s+/gm, ''); // Remove indentation

          // OPTION 1: Show ONLY in redbox
          throw new Error(errorMessage);
        }
        return null;
      }
    }, [isStorageEnabled]);

    const [mode, setModeState] = useState<ThemeMode>(() => {
      if (!isStorageEnabled || !storage) {
        return defaultMode;
      }
      const stored = storage.getString(storageKey) as ThemeMode | undefined;
      return stored || defaultMode;
    });

    const setMode = useCallback(
      (newMode: ThemeMode) => {
        setModeState(newMode);
        if (isStorageEnabled && storage) {
          storage.set(storageKey, newMode);
        }
      },
      [isStorageEnabled, storage, storageKey]
    );

    const resetThemeMode = useCallback(() => {
      if (isStorageEnabled && storage) {
        storage.delete(storageKey);
      }
      setModeState('system');
    }, [isStorageEnabled, storage, storageKey]);

    const resolvedMode: 'light' | 'dark' = useMemo(() => {
      if (mode === 'system') {
        return systemColorScheme === 'dark' || systemColorScheme === 'light'
          ? systemColorScheme
          : fallbackTheme;
      }
      return mode;
    }, [mode, systemColorScheme, fallbackTheme]);

    // Simplified and optimized theme colors calculation
    const themeColors = useMemo(() => {
      // Special case for iOS dynamic colors
      if (Platform.OS === 'ios' && mode === 'system' && dynamicIOSColors) {
        return dynamicIOSColors;
      }

      // Use pre-computed complete dark theme for dark mode
      return (
        resolvedMode === 'dark' ? completeDarkTheme : config.colors.light
      ) as ResolvedColors;
    }, [resolvedMode, mode]);

    const theme = useMemo(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { colors, ...rest } = config;
      return {
        colorMode: resolvedMode,
        colors: themeColors,
        ...rest,
      } as Theme;
    }, [resolvedMode, themeColors]);

    return (
      <ModeContext.Provider value={mode}>
        <SetModeContext.Provider value={setMode}>
          <ResetModeContext.Provider value={resetThemeMode}>
            <ThemeContext.Provider value={theme}>
              {children}
            </ThemeContext.Provider>
          </ResetModeContext.Provider>
        </SetModeContext.Provider>
      </ModeContext.Provider>
    );
  };

  const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
      throw new Error(
        '[theme-csx] useTheme must be used within AppThemeProvider'
      );
    }
    return theme;
  };

  const useThemeMode = () => useContext(ModeContext);
  const useSetThemeMode = () => {
    const ctx = useContext(SetModeContext);
    if (!ctx) {
      throw new Error(
        '[theme-csx] useSetThemeMode must be used inside AppThemeProvider'
      );
    }
    return ctx;
  };
  const useResetThemeMode = () => {
    const ctx = useContext(ResetModeContext);
    if (!ctx) {
      throw new Error(
        '[theme-csx] useResetThemeMode must be used inside AppThemeProvider'
      );
    }
    return ctx;
  };

  const useCycleThemeMode = () => {
    const mode = useThemeMode();
    const set = useSetThemeMode();
    return useCallback(() => {
      const next: ThemeMode =
        mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
      set(next);
    }, [mode, set]);
  };

  const useToggleThemeMode = () => {
    const mode = useThemeMode();
    const set = useSetThemeMode();
    return useCallback(() => {
      const next: ThemeMode = mode === 'dark' ? 'light' : 'dark';
      set(next);
    }, [mode, set]);
  };

  type RNStyle = ViewStyle | TextStyle | ImageStyle;
  type NamedStyles<T> = { [P in keyof T]: RNStyle };
  // Style creator function(dynamic - based on theme)
  type ThemedStyleCreator<T extends NamedStyles<T>> = (
    theme: Theme
  ) => NamedStyles<T>;

  // Style creator function(static - based on config)
  type StaticStyleCreator<T extends NamedStyles<T>> = (
    theme: typeof config
  ) => NamedStyles<T>;

  // Themed styles
  const createThemedStyles = <T extends NamedStyles<T>>(
    styleFn: ThemedStyleCreator<T>
  ) => {
    // Theme-to-StyleSheet cache
    const styleSheetCache = new WeakMap<
      Theme,
      ReturnType<typeof StyleSheet.create>
    >();

    return function useThemedStyles(): ReturnType<typeof StyleSheet.create> {
      const theme = useTheme();

      return useMemo(() => {
        // Check if we already created a StyleSheet for this theme
        if (styleSheetCache.has(theme)) {
          return styleSheetCache.get(theme) as ReturnType<
            typeof StyleSheet.create
          >;
        }

        // Create raw styles based on the theme
        const rawStyles = styleFn(theme);

        // Create optimized StyleSheet from raw styles
        const optimizedStyles = StyleSheet.create(rawStyles);

        // Cache the StyleSheet for this theme
        styleSheetCache.set(theme, optimizedStyles);

        return optimizedStyles;
      }, [theme]);
    };
  };

  // Static styles - This is a static version of createThemedStyles
  const createStaticStyles = <T extends NamedStyles<T>>(
    styleFn: StaticStyleCreator<T>
  ) => {
    return StyleSheet.create(styleFn(config));
  };

  return {
    AppThemeProvider,
    useTheme,
    useThemeMode,
    useSetThemeMode,
    useResetThemeMode,
    useToggleThemeMode,
    useCycleThemeMode,
    createThemedStyles,
    createStaticStyles,
    types: null as unknown as {
      Theme: Theme;
      ThemeMode: ThemeMode;
    },
  };
}

// Updated validation helper for the new approach
function validateThemeConfig<T extends RequiredThemeConfig>(config: T) {
  if (
    !config.colors ||
    typeof config.colors !== 'object' ||
    Array.isArray(config.colors)
  ) {
    throw new Error("[theme-csx] Theme config must include a 'colors' object.");
  }

  if (!config.colors?.light) {
    throw new Error(
      "[theme-csx] Theme colors object must include 'light' colors"
    );
  }

  // Skip validation if dark theme is not provided
  if (!config.colors.dark) {
    return;
  }

  // validate that dark colors (if present) only use keys from light
  if (config.colors.dark) {
    const lightKeys = Object.keys(config.colors.light);
    const darkKeys = Object.keys(config.colors.dark);

    const invalidDarkKeys = darkKeys.filter((key) => !lightKeys.includes(key));

    if (invalidDarkKeys.length > 0) {
      throw new Error(
        `[theme-csx] Dark theme contains keys not present in light theme: ${invalidDarkKeys.join(', ')}\n` +
          'These keys will be ignored. All dark theme colors should be overrides of light theme colors.'
      );
    }
  }
}
