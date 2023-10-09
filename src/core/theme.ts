import { useEffect, useMemo, useRef, useState } from 'react';
import { Appearance, ColorValue, Platform } from 'react-native';

// Type
import type { inputStyleTypes, themeObj } from '../types';
// Appearance Hook
import appearanceHook from './appearance';
// Theme Processor
import themeProcessor from '../processor/themeProcessor';
// Mobx State Tree
import { onPatch } from 'mobx-state-tree';
// Helper
import dynamicColorIOS from '../helper/dynamicColor';
import isThemedStyle from '../helper/themedStyle';

/**
 * @Processing Theme style function
 *
 * @param style TTextStyle | TViewStyle | TImageStyle
 *
 * @returns object style
 *
 */
const T = (style: inputStyleTypes): object => {
  // If style input is not a valid type!
  if (!isThemedStyle(style)) {
    throw new Error(
      'Invalid Theme Input: Is it a valid theme style type? Expected types: TTextStyle | TViewStyle | TImageStyle  '
    );
  }
  // Theme state
  const [theme, setTheme] = useState(appearanceHook.activeTheme);

  // Navigation page - unmount ref
  const unmounted = useRef(false);

  // Navigation page - mounting & unmounting registration
  useEffect(() => {
    unmounted.current = false;

    return () => {
      unmounted.current = true;
    };
  }, []);

  // On appearanceHook change
  onPatch(appearanceHook, () => {
    if (!unmounted.current) {
      setTheme(appearanceHook.activeTheme);
    }
  });

  // Grab dark theme style
  const darkStyle = useMemo(() => {
    return themeProcessor(style, 'dark');
  }, [style]);

  // Grab light theme style
  const lightStyle = useMemo(() => {
    return themeProcessor(style, 'light');
  }, [style]);

  // IOS && System
  if (theme === 'system' && Platform.OS === 'ios') {
    return themeProcessor(style, 'systemIOS');
  } else {
    // Return style {object}
    if (
      theme === 'dark' ||
      (theme === 'system' && Appearance.getColorScheme() === 'dark')
    ) {
      return darkStyle;
    } else {
      return lightStyle;
    }
  }
};

export default T;

/**
 * @Processing Theme value function
 *
 * @param Color light theme value
 *
 * @param ColorDark dark theme value
 *
 * @returns {string | OpaqueColorValue} colorValue
 *
 */
export const TV = (color: ColorValue, colorDark: ColorValue): any => {
  // If colorValue input is not a valid type!
  if (!color && !colorDark) {
    throw new Error('Invalid Color Input: Is it a valid color value ?');
  }

  // Theme state - used for re-render purpose
  const [theme, setTheme] = useState(appearanceHook.activeTheme);

  // Navigation page - unmount ref
  const unmounted = useRef(false);

  // Navigation page - mounting & unmounting registration
  useEffect(() => {
    unmounted.current = false;

    return () => {
      unmounted.current = true;
    };
  }, []);

  // On appearanceHook change - re-render components
  onPatch(appearanceHook, () => {
    if (!unmounted.current) {
      setTheme(appearanceHook.activeTheme);
    }
  });

  // IOS && System
  if (theme === 'system' && Platform.OS === 'ios') {
    return dynamicColorIOS(color, colorDark);
  } else {
    // Return ColorValue {string}
    if (
      theme === 'dark' ||
      (theme === 'system' && Appearance.getColorScheme() === 'dark')
    ) {
      return colorDark;
    } else {
      return color;
    }
  }
};

/**
 * @Processing Theme object function
 *
 * @param arg theme object values
 *
 *
 * @returns {arg object} theme values
 *
 */
export const themeProvider = <
  T extends {
    [keys in keyof typeof themeObj]: Record<
      string,
      | string
      | number
      | Record<string, string | number | Record<string, string | number>>
    >;
  },
>(
  arg: T
): T => {
  return arg;
};

/**
 * Theme Settings Change Event
 *
 * @event addChangeListener
 *
 * @action change theme dynamically
 */
let prevSettingsColor = Appearance.getColorScheme();
Appearance.addChangeListener(() => {
  if (
    appearanceHook.activeTheme === 'system' &&
    prevSettingsColor !== Appearance.getColorScheme() &&
    Platform.OS !== 'ios'
  ) {
    appearanceHook.switch(Appearance.getColorScheme());
    appearanceHook.switch('system');
    prevSettingsColor = Appearance.getColorScheme();
  }
});
