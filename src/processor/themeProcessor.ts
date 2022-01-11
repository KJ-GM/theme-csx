// Function theme types
type theme = 'light' | 'dark';

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
  } else {
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
  }
};

export default themeProcessor;
