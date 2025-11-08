import { DynamicColorIOS, type ColorValue } from 'react-native';
import type { ColorSet, RequiredThemeConfig } from './types';

/* copied from:
 * https://github.com/facebook/react-native/blob/v0.81.0/packages/react-native/Libraries/StyleSheet/PlatformColorValueTypesIOS.d.ts
 */
const DynamicColorIOSProperties = [
  'light',
  'dark',
  'highContrastLight',
  'highContrastDark',
] as const;

/**
 * Checks if a given value is a dynamic color object.
 *
 * A dynamic color object is an object that contains a "dynamic"
 * property, which is an object with one or more of the following
 * properties: light, dark, highContrastLight, highContrastDark.
 *
 * @param {any} value The value to check.
 * @return {boolean} True if the value is a dynamic color object, false otherwise.
 */
export function isDynamicColorObject(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    'dynamic' in value &&
    DynamicColorIOSProperties.some((key) => key in value.dynamic)
  );
}

/**
 * Validate the theme config object.
 *
 * @throws {Error} If the theme config is invalid
 *
 * @remarks
 * This function checks that the theme config contains a 'colors' object,
 * that the 'colors' object contains a 'light' theme, and that the 'dark'
 * theme (if present) only overrides keys from the 'light' theme.
 */
export function validateThemeConfig<T extends RequiredThemeConfig>(config: T) {
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

/**
 * Creates a complete dark theme colors object by merging the given light
 * theme colors with the optional dark theme colors.
 *
 * If dark theme colors are not provided, the light theme colors are
 * returned as is.
 *
 * The dark theme colors object is expected to only override keys present
 * in the light theme colors object. If any invalid keys are found,
 * an error will be thrown.
 *
 * @param lightColors - The base light theme colors object.
 * @param darkColors - Optional dark theme colors object.
 * @returns A complete dark theme colors object.
 */
export function createCompleteDarkColors<T extends string>(
  lightColors: ColorSet<T>,
  darkColors?: Partial<ColorSet<T>>
): ColorSet<T> {
  if (!darkColors) {
    return lightColors;
  }
  return { ...lightColors, ...darkColors };
}

/**
 * Calculates a dynamic color object for each key in the given theme config's light colors.
 *
 * The resulting object will have the same keys as the light colors object, but
 * the values will be dynamic color objects with the light and dark theme colors
 * merged.
 *
 * If the light colors object is empty, null is returned.
 *
 * @param {T} config - The theme config object.
 * @param {ColorSet<any>} completeDarkColors - The complete dark theme colors object.
 * @returns {object} An object with dynamic color values for each key in the light colors object.
 */
export function calculateDynamicIOSColors<T extends RequiredThemeConfig<any>>(
  config: T,
  completeDarkColors: ColorSet<any>
) {
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
}
