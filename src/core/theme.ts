import { useMemo } from 'react';
import { Appearance } from 'react-native';

// Type
import type { inputStyleTypes } from '../types';
// IsThemed Helper Function
import isThemedStyle from '../helper/themedStyle';
// Appearance Hook
import appearanceHook from './appearance';
// Theme Processor
import themeProcessor from '../processor/themeProcessor';

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
  // grab dark theme style
  const darkStyle = useMemo(() => {
    return themeProcessor(style, 'dark');
  }, [style]);

  // grab light theme style
  const lightStyle = useMemo(() => {
    return themeProcessor(style, 'light');
  }, [style]);

  // return final style obj
  if (
    appearanceHook.activeTheme === 'dark' ||
    (appearanceHook.activeTheme === 'system' &&
      Appearance.getColorScheme() === 'dark')
  ) {
    return darkStyle;
  } else {
    return lightStyle;
  }
};

export default T;
