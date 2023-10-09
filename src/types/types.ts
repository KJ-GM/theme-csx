import type {
  ColorSchemeName,
  ColorValue,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

/** Themed TextStyle  */
export interface TTextStyle extends TextStyle {
  colorDark: ColorValue | undefined;
  color: ColorValue | undefined;
  backgroundDark?: ColorValue | undefined;
  borderDark?: ColorValue | undefined;
}

/** Themed ViewStyle  */
export interface TViewStyle extends ViewStyle {
  backgroundDark: ColorValue | undefined;
  borderDark?: ColorValue | undefined;
}

/** Themed ImageStyle  */
export interface TImageStyle extends ImageStyle {
  tintColorDark: ColorValue | undefined;
  backgroundDark?: ColorValue | undefined;
  borderDark?: ColorValue | undefined;
}

/** Input Themed Styles  */
export type inputStyleTypes =
  | TTextStyle
  | TViewStyle
  | TImageStyle
  | TextStyle
  | ViewStyle
  | ImageStyle;

/** StyleSheet extended Types  */
export type NamedStyles<T> = {
  [P in keyof T]: inputStyleTypes;
};

/** Theming Types  */
export type themeTypes = 'system' | ColorSchemeName;

/** Theme object Types  */
export enum themeObj {
  colors,
  spacing,
  font,
  lineHeight,
  letterSpacing,
  shadow,
}
