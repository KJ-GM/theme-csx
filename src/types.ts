import type { ColorValue } from 'react-native';

// Types
export type ThemeMode = 'light' | 'dark' | 'system';

export type DynamicColorValue = {
  dynamic: {
    light: ColorValue;
    dark: ColorValue;
    highContrastLight?: ColorValue;
    highContrastDark?: ColorValue;
  };
};

// Enhanced type definitions for better type safety
export type ColorSet<T extends string = string> = Record<T, string>;

export type RequiredThemeConfig<T extends string = string> = {
  colors: {
    light: ColorSet<T>;
    dark?: Partial<ColorSet<T>>; // Optional and partial
  };
};
