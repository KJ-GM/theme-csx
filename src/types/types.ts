import type {
  ColorSchemeName,
  ColorValue,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Theme Types + Interfaces =>

// enum ThemeMode {
//   'light',
//   'dark',
// }

// type Colors = themeMode;

// type Space = Record<string | number, number>;

// type Fonts = {
//   family?: Record<string, string>;
//   size?: Record<string | number, number>;
// };

// type Shadow = {
//   shadowColor: string;
//   shadowOffset: {
//     width: number;
//     height: number;
//   };
//   shadowOpacity: number;
//   shadowRadius: number;
//   elevation: number;
// };

// type Border = {
//   width?: Record<string | number, number>;
//   radius?: Record<string | number, number>;
// };

// type ThemeType = {
//   colors?: Colors;
//   space?: Space;
//   fonts?: Fonts;
//   shadow?: Shadow;
//   border?: Border;
// };

// const theme: ThemeType = {
//   colors: {
//     // light nad dark option

//     light: {
//       red: 'red',
//     },
//     dark: {
//       red: 'red',
//     },
//   },
//   space: {
//     $none: 0,
//     $0: 0,
//     $1: 4,
//     $2: 8,
//     $3: 16,
//     $4: 32,
//     $5: 64,
//     $6: 128,
//     $7: 256,
//     $8: 512,
//   },
//   // font: {
//   //   family: {
//   //     // font family
//   //   },
//   //   size: {
//   //     // font size
//   //   },
//   // },
//   // border: {
//   //   width: {
//   //     // border width
//   //   },
//   //   radius: {
//   //     // border radius
//   //   },
//   // },
// };

// type colors = keyof typeof theme.colors;

// type space = keyof typeof theme.space;

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

/** Theming Types  */
export type theme = 'system' | ColorSchemeName;

/** Themed  Object  */
export interface Theme {
  colors?: object | undefined;
  spacing?: object | undefined;
  border?: object | undefined;
  font?: object | undefined;
}
