import { useMemo, useState } from 'react';
import { Appearance } from 'react-native';

// Type
import type { inputStyleTypes } from '../types';
// IsThemed Helper Function
import isThemedStyle from '../helper/themedStyle';
// Appearance Hook
import appearanceHook from './appearance';
// Theme Processor
import themeProcessor from '../processor/themeProcessor';
// Mobx State Tree
import { onPatch } from 'mobx-state-tree';

/**
 * @Processing Theme Function
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

  // Theme state - used for re-render purpose
  const [theme, setTheme] = useState(appearanceHook.activeTheme);

  // On appearanceHook change - re-render components
  onPatch(appearanceHook, () => {
    setTheme(appearanceHook.activeTheme);
  });

  // Grab dark theme style
  const darkStyle = useMemo(() => {
    return themeProcessor(style, 'dark');
  }, [style]);

  // Grab light theme style
  const lightStyle = useMemo(() => {
    return themeProcessor(style, 'light');
  }, [style]);

  // Return final style obj
  if (
    theme === 'dark' ||
    (theme === 'system' && Appearance.getColorScheme() === 'dark')
  ) {
    return darkStyle;
  } else {
    return lightStyle;
  }
};

export default T;
