import type {
  ColorValue,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Theme Types + Interfaces =>

/** Themed TextStyle  */
export interface TTextStyle extends TextStyle {
  colorDark: ColorValue | undefined;
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

/** Combined Themed Styles  */
export type stylesType =
  | TTextStyle
  | TViewStyle
  | TImageStyle
  | TextStyle
  | ViewStyle
  | ImageStyle;

/** StyleSheet extended Types  */
export type NamedStyles<T> = {
  [P in keyof T]: stylesType;
};
/** Theming Types  */
export type themeTypes = 'system' | 'light' | 'dark';
