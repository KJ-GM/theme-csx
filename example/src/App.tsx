import { Text, View, TouchableOpacity } from 'react-native';
import { createAppTheme } from 'theme-csx';

export const themeConfig = {
  colors: {
    light: {
      primary: '#6200EE', // Material Design primary color
      primaryVariant: '#3700B3',
      secondary: '#03DAC6',
      secondaryVariant: '#018786',
      background: '#FFFFFF',
      surface: '#FFFFFF',
      error: '#B00020',
      onPrimary: '#FFFFFF',
      onSecondary: '#000000',
      onBackground: '#000000',
      onSurface: '#000000',
      onError: '#FFFFFF',
      text: '#000000',
      textSecondary: '#757575',
      divider: '#E0E0E0',
    },
    dark: {
      primary: '#BB86FC',
      primaryVariant: '#3700B3',
      secondary: '#03DAC6',
      secondaryVariant: '#03DAC6',
      background: '#121212',
      surface: '#1E1E1E',
      error: '#CF6679',
      onPrimary: '#000000',
      onSecondary: '#000000',
      onBackground: '#FFFFFF',
      onSurface: '#FFFFFF',
      onError: '#000000',
      text: '#FFFFFF',
      textSecondary: '#BDBDBD',
      divider: '#424242',
    },
  },
  spacing: {
    none: 0,
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 999,
  },
  typography: {
    displayLarge: {
      fontSize: 57,
      fontWeight: '400' as const,
      lineHeight: 64,
      letterSpacing: -0.25,
    },
    displayMedium: {
      fontSize: 45,
      fontWeight: '400' as const,
      lineHeight: 52,
    },
    displaySmall: {
      fontSize: 36,
      fontWeight: '400' as const,
      lineHeight: 44,
    },
    headlineLarge: {
      fontSize: 32,
      fontWeight: '400' as const,
      lineHeight: 40,
    },
    headlineMedium: {
      fontSize: 28,
      fontWeight: '400' as const,
      lineHeight: 36,
    },
    headlineSmall: {
      fontSize: 24,
      fontWeight: '400' as const,
      lineHeight: 32,
    },
    titleLarge: {
      fontSize: 22,
      fontWeight: '400' as const,
      lineHeight: 28,
    },
    titleMedium: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    titleSmall: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 20,
      letterSpacing: 0.1,
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    labelLarge: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 20,
      letterSpacing: 0.1,
    },
    labelMedium: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0.5,
    },
    labelSmall: {
      fontSize: 11,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0.5,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  zIndices: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  animation: {
    quick: 100,
    medium: 300,
    slow: 500,
  },
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
};

const appTheme = createAppTheme(themeConfig);

export const {
  AppThemeProvider,
  useTheme,
  useThemeMode,
  useSetThemeMode,
  useToggleThemeMode,
  createThemedStyles,
  types,
} = appTheme;

export type Theme = typeof types.Theme;
export type ThemeMode = typeof types.ThemeMode;

export default function App() {
  return (
    <AppThemeProvider>
      <Test />
    </AppThemeProvider>
  );
}

export const useStyles = createThemedStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.bodyLarge.fontSize,
    fontWeight: theme.typography.bodyLarge.fontWeight,
  },
}));

function Test() {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SettingsScreen</Text>
      <Text>System color</Text>
      <ThemeToggle />
    </View>
  );
}

const ThemeToggle = () => {
  const setThemeMode = useSetThemeMode();
  const mode = useThemeMode();
  const styles = useStyles();

  const toggleTheme = () => {
    if (mode === 'system') {
      setThemeMode('light');
    } else if (mode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('system');
    }
  };

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text style={styles.text}>Current theme: {mode}</Text>
    </TouchableOpacity>
  );
};

// Test
