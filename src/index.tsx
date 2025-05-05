/* eslint-disable @typescript-eslint/no-shadow */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from 'react';
import {
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
  useColorScheme,
  DynamicColorIOS,
  Platform,
  type ColorValue,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';

// Types
type EnsureMatchingKeys<
  T extends Record<string, any>,
  U extends Record<string, any>,
> = keyof T extends keyof U ? (keyof U extends keyof T ? T : never) : never;

type RequiredThemeConfig<ColorKeys extends string = string> = {
  colors: {
    light: EnsureMatchingKeys<
      Record<ColorKeys, string>,
      Record<ColorKeys, string>
    >;
    dark: EnsureMatchingKeys<
      Record<ColorKeys, string>,
      Record<ColorKeys, string>
    >;
  };
};

type ThemeMode = 'light' | 'dark' | 'system';

let hasCreatedAppTheme = false;

// Default MMKV instance
const defaultMMKV = new MMKV();
const DEFAULT_STORAGE_KEY = 'app-theme-mode';

// iOS-only dynamic color calculation
const calculateDynamicIOSColors = <T extends RequiredThemeConfig>(
  config: T
) => {
  const { colors } = config;
  if (!colors.light || !colors.dark) {
    return null;
  }

  return Object.fromEntries(
    Object.keys(colors.light).map((key) => [
      key,
      DynamicColorIOS({
        light: colors.light[key] as ColorValue,
        dark: colors.dark[key] as ColorValue,
      }),
    ])
  );
};

export function createAppTheme<T extends RequiredThemeConfig>(
  config: T,
  options?: {
    storage?: boolean; // ✅ Use default MMKV if true, disable if false
  }
) {
  if (__DEV__) {
    console.info(`
\x1b[32m🎨 [theme-csx] Theme system initialized\x1b[0m
\x1b[36mDocs:\x1b[0m https://github.com/KJ-GM/theme-csx
    `);
  }

  type LightColors = T['colors']['light'];
  type DarkColors = T['colors']['dark'];
  type Theme = {
    colorMode: 'light' | 'dark';
    colors: LightColors | DarkColors;
  } & Omit<T, 'colors'>;

  if (__DEV__) {
    if (hasCreatedAppTheme) {
      console.warn(
        '[createAppTheme] Warning: Called more than once. This may cause unexpected behavior.'
      );
    }
    hasCreatedAppTheme = true;
    validateThemeConfig(config);

    if (options?.storage === false) {
      console.warn(
        '[createAppTheme] Storage is disabled. Theme mode will not persist.'
      );
    }
  }

  const dynamicIOSColors =
    Platform.OS === 'ios' ? calculateDynamicIOSColors(config) : null;

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
    const storage = defaultMMKV;
    const storageKey = DEFAULT_STORAGE_KEY;

    // 🧹 Clean up previously stored theme mode if storage is disabled
    useEffect(() => {
      if (!isStorageEnabled) {
        defaultMMKV.delete(storageKey);
      }
    }, [isStorageEnabled, storageKey]);

    const [mode, setModeState] = useState<ThemeMode>(() => {
      if (!isStorageEnabled) {
        return defaultMode;
      }
      const stored = storage.getString(storageKey) as ThemeMode | undefined;
      return stored || defaultMode;
    });

    const setMode = useCallback(
      (newMode: ThemeMode) => {
        setModeState(newMode);
        if (isStorageEnabled) {
          storage.set(storageKey, newMode);
        }
      },
      [isStorageEnabled, storage, storageKey]
    );

    const resetThemeMode = useCallback(() => {
      if (isStorageEnabled) {
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

    const themeColors = useMemo(() => {
      if (Platform.OS === 'ios' && mode === 'system' && dynamicIOSColors) {
        return dynamicIOSColors;
      }
      return config.colors[resolvedMode];
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
      throw new Error('useTheme must be used within AppThemeProvider');
    }
    return theme;
  };

  const useThemeMode = () => useContext(ModeContext);
  const useSetThemeMode = () => {
    const ctx = useContext(SetModeContext);
    if (!ctx) {
      throw new Error('useSetThemeMode must be used inside AppThemeProvider');
    }
    return ctx;
  };
  const useResetThemeMode = () => {
    const ctx = useContext(ResetModeContext);
    if (!ctx) {
      throw new Error('useResetThemeMode must be used inside AppThemeProvider');
    }
    return ctx;
  };

  const useToggleThemeMode = () => {
    const mode = useThemeMode();
    const set = useSetThemeMode();
    return useCallback(() => {
      const next: ThemeMode =
        mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
      set(next);
    }, [mode, set]);
  };

  type RNStyle = ViewStyle | TextStyle | ImageStyle;
  type NamedStyles<T> = { [P in keyof T]: RNStyle };
  type StyleCreator<T extends NamedStyles<T>> = (
    theme: Theme
  ) => NamedStyles<T>;

  const createThemedStyles = <T extends NamedStyles<T>>(
    styleFn: StyleCreator<T>
  ) => {
    const stylesCache = new WeakMap<Theme, T>();

    return function useThemedStyles(): T {
      const theme = useTheme();

      return useMemo(() => {
        if (stylesCache.has(theme)) {
          return stylesCache.get(theme) as T;
        }

        const styles = styleFn(theme) as T;
        stylesCache.set(theme, styles);
        return styles;
      }, [theme]);
    };
  };

  return {
    AppThemeProvider,
    useTheme,
    useThemeMode,
    useSetThemeMode,
    useResetThemeMode,
    useToggleThemeMode,
    createThemedStyles,
    types: null as unknown as {
      Theme: Theme;
      ThemeMode: ThemeMode;
    },
  };
}

// Validation helper
function validateThemeConfig<T extends RequiredThemeConfig>(config: T) {
  if (!config.colors?.light || !config.colors?.dark) {
    throw new Error('Theme config must include both light and dark colors');
  }

  const lightKeys = Object.keys(config.colors.light);
  const darkKeys = Object.keys(config.colors.dark);

  const missingInDark = lightKeys.filter((k) => !darkKeys.includes(k));
  const missingInLight = darkKeys.filter((k) => !lightKeys.includes(k));

  if (missingInDark.length || missingInLight.length) {
    console.warn(
      'Theme color mismatch:\n' +
        `Missing in dark: ${missingInDark.join(', ') || 'none'}\n` +
        `Missing in light: ${missingInLight.join(', ') || 'none'}`
    );
  }
}
