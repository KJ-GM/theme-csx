import {themeProvider} from 'theme-csx';

// theme object
const Theme = {
  colors: {
    primary: '#f0c029',
    secondary: '#BB86FC',
    gray: '#A8A9A8',
    light: {
      background: '#fff',
      text: '#000000',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
    },
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 12,
    large: 24,
    huge: 64,
  },
  font: {
    family: {
      muktaBold: 'Mukta-Bold',
      muktaMedium: 'Mukta-Medium',
      muktaRegular: 'Mukta-Regular',
      muktaSemiBold: 'Mukta-SemiBold',
      NunitoBold: 'Nunito-Bold',
      NunitoRegular: 'Nunito-Regular',
      NunitoSemiBold: 'Nunito-SemiBold',
    },
    size: {
      xxs: 9,
      xs: 10,
      s: 13,
      m: 16,
      l: 18,
    },
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6,
  },
  shadow: {
    xs: {
      shadowColor: '#000',
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    sm: {
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
  },
};
export const theme = themeProvider(Theme);
