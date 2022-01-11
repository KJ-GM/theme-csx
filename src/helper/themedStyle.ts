import type { inputStyleTypes } from 'src/types';

/**
 * Check if theme style is of typeOf: TTextStyle | TViewStyle | TImageStyle only
 */
const isThemedStyle = (style: inputStyleTypes): boolean => {
  if (
    style.hasOwnProperty('colorDark') ||
    style.hasOwnProperty('backgroundDark') ||
    style.hasOwnProperty('borderDark') ||
    style.hasOwnProperty('tintColorDark')
  ) {
    return true;
  }
  return false;
};

export default isThemedStyle;
