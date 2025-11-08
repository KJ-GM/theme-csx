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
  Platform,
  StyleSheet,
} from 'react-native';

import {
  calculateDynamicIOSColors,
  createCompleteDarkColors,
  isDynamicColorObject,
  validateThemeConfig,
} from './helpers';

import type {
  DynamicColorValue,
  RequiredThemeConfig,
  ThemeMode,
} from './types';

let isThemeInitialized = false;
const DEFAULT_STORAGE_KEY = 'app-theme-mode';

export function createAppTheme<T extends RequiredThemeConfig>(
  config: T,
  options: {
    storage?: boolean; // ✅ Use MMKV only if true
    storageInstance?: any; // optional user-provided MMKV instance
    storageKey?: string; // optional custom key for theme mode
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
    const storageKey = options?.storageKey || DEFAULT_STORAGE_KEY;

    const storage = useMemo(() => {
      if (!isStorageEnabled) return null;
      if (options?.storageInstance) {
        return options.storageInstance;
      }
      try {
        const mmkvModule = require('react-native-mmkv');

        // v4 Nitro Modules support
        if (typeof mmkvModule.createMMKV === 'function') {
          return mmkvModule.createMMKV();
        }

        // fallback to v3
        if (typeof mmkvModule.MMKV === 'function') {
          return new mmkvModule.MMKV();
        }
      } catch (err: any) {
        if (__DEV__) {
          throw new Error(`
          🎨 [theme-csx] MMKV Error ❌
          ==============================
          You enabled theme persistence (storage: true), but 'react-native-mmkv' is missing or incompatible.

          Original error:
          ${err}

          Solutions:
          1. If you use MMKV v4 (recommended): install both packages
            npm install react-native-mmkv react-native-nitro-modules
          2. If you use MMKV v3: install only MMKV
            npm install react-native-mmkv
          3. Or disable storage: createAppTheme(config, { storage: false })

          Note:
          - Storage is disabled by default.
          - You can pass your own MMKV instance via the "storageInstance" option.
          - You can also handle theme persistence externally, without using this library's built-in storage.
`);
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
        if ('remove' in storage) {
          storage.remove(storageKey); // v4 mmkv
        } else if ('delete' in storage) {
          storage.delete(storageKey); // v3 mmkv
        }
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

  // Full RN style union
  type RNStyle = ViewStyle | TextStyle | ImageStyle;

  // StyleCreator
  type ThemedStyleCreator<T> = (theme: Theme) => T;
  type StaticStyleCreator<T> = (theme: typeof config) => T;

  // Themed styles
  const createThemedStyles = <T extends Record<string, RNStyle>>(
    styleFn: ThemedStyleCreator<T>
  ) => {
    // Theme-to-StyleSheet cache
    const styleSheetCache = new WeakMap<
      Theme,
      ReturnType<typeof StyleSheet.create>
    >();

    return function useThemedStyles(): T {
      const theme = useTheme();

      return useMemo(() => {
        // Check if we already created a StyleSheet for this theme
        if (styleSheetCache.has(theme)) {
          return styleSheetCache.get(theme) as T;
        }

        // Create raw styles based on the theme
        const rawStyles = styleFn(theme);

        // Create optimized StyleSheet from raw styles
        const optimizedStyles = StyleSheet.create(rawStyles);

        // Cache the StyleSheet for this theme
        styleSheetCache.set(theme, optimizedStyles);

        return optimizedStyles as T;
      }, [theme]);
    };
  };

  // Static styles - This is a static version of createThemedStyles
  const createStaticStyles = <T extends Record<string, RNStyle>>(
    styleFn: StaticStyleCreator<T>
  ) => {
    return StyleSheet.create(styleFn(config));
  };

  const resolveColor = (color: DynamicColorValue | string): string => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { colorMode } = useTheme();

      if (typeof color === 'string') return color;

      if (isDynamicColorObject(color)) {
        return colorMode === 'dark'
          ? (color.dynamic.dark as string)
          : (color.dynamic.light as string);
      }

      return '#FFFFFF';
    } catch (error: any) {
      // Detect "called outside React" situations
      const isReactRuntimeError =
        error?.message?.includes('Invalid hook call') ||
        error?.message?.includes('Cannot read property') ||
        error?.message?.includes('runtime not ready');

      if (isReactRuntimeError) {
        throw new Error(
          `[theme-csx] ❌ resolveColor() cannot be used outside a React function component.`
        );
      }
      // Re-throw any other unexpected errors
      throw error;
    }
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
    resolveColor,
    types: null as unknown as {
      Theme: Theme;
      ThemeMode: ThemeMode;
    },
  };
}
