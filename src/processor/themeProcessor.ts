import dynamicColorIOS from '../helper/dynamicColor';

// Function theme types
type theme = 'light' | 'dark' | 'systemIOS';

/**
 * @Processing Theme Processor
 *
 * @param style obj style
 *
 * @param type 'light' | 'dark'
 *
 * @returns {themed} obj style
 *
 */
const themeProcessor = (style: any, type: theme): object => {
  const { backgroundDark, borderDark, colorDark, tintColorDark, ...other } =
    style;
  if (type === 'light') {
    return other;
  } else if (type === 'dark') {
    let outputStyle = other;
    if (backgroundDark) {
      outputStyle = {
        ...outputStyle,
        backgroundColor: backgroundDark,
      };
    }
    if (borderDark) {
      outputStyle = {
        ...outputStyle,
        borderColor: borderDark,
      };
    }

    if (colorDark) {
      outputStyle = {
        ...outputStyle,
        color: colorDark,
      };
    }

    if (tintColorDark) {
      outputStyle = {
        ...outputStyle,
        tintColor: tintColorDark,
      };
    }
    return outputStyle;
  } else {
    let outputStyle = other;
    if (backgroundDark) {
      const { backgroundColor } = style;
      outputStyle = {
        ...outputStyle,
        backgroundColor: dynamicColorIOS(
          backgroundColor,
          backgroundDark,
          'white'
        ),
      };
    }
    if (borderDark) {
      const { borderColor } = style;
      outputStyle = {
        ...outputStyle,
        borderColor: dynamicColorIOS(borderColor, borderDark, 'black'),
      };
    }

    if (colorDark) {
      const { color } = style;
      outputStyle = {
        ...outputStyle,
        color: dynamicColorIOS(color, colorDark, 'black'),
      };
    }

    if (tintColorDark) {
      const { tintColor } = style;
      outputStyle = {
        ...outputStyle,
        tintColor: dynamicColorIOS(tintColor, tintColorDark, 'black'),
      };
    }
    return outputStyle;
  }
};

export default themeProcessor;
