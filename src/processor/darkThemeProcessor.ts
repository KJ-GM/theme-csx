import { Appearance, ColorValue } from 'react-native';
import appearanceHook from '../core/appearance';

/**
 * Processor responsible for changing theme color
 */
const darkThemeProcessor = (
  styles: object,
  bgDark?: ColorValue | undefined,
  borderDark?: ColorValue | undefined,
  textDark?: ColorValue | undefined,
  tintDark?: ColorValue | undefined
): object => {
  let processedStyle = styles;

  // only replace if color scheme is dark
  if (
    appearanceHook.activeTheme === 'dark' ||
    (appearanceHook.activeTheme === 'system' &&
      Appearance.getColorScheme() === 'dark')
  ) {
    if (bgDark) {
      processedStyle = {
        ...processedStyle,
        backgroundColor: bgDark,
      };
    }

    if (borderDark) {
      processedStyle = {
        ...processedStyle,
        borderColor: borderDark,
      };
    }

    if (textDark) {
      processedStyle = {
        ...processedStyle,
        color: textDark,
      };
    }

    if (tintDark) {
      processedStyle = {
        ...processedStyle,
        tintColor: tintDark,
      };
    }
  }

  return processedStyle;
};

export default darkThemeProcessor;
