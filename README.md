![Theme CSX Logo](https://user-images.githubusercontent.com/52489083/149637586-f0c3b5ce-6b99-431f-b821-7ca1e208073e.png)

![NPM Downloads](https://img.shields.io/npm/dy/theme-csx?logo=Github&style=for-the-badge)
![GitHub code size](https://img.shields.io/github/languages/code-size/KJA-Tsx/theme-csx?logo=Github&style=for-the-badge)
![Status - active](https://img.shields.io/badge/Status-active-blueviolet?logo=Github&style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/KJA-Tsx/theme-csx?logo=Github&style=for-the-badge)

#
<div align="center">

<table style="border-collapse: collapse;">
  <tr>
    <td align="center" style="padding: 12px 24px; border-bottom: 1px solid #ddd;">
      <strong>iOS Demo</strong>
    </td>
    <td align="center" style="padding: 12px 24px; border-bottom: 1px solid #ddd;">
      <strong>Android Demo</strong>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 16px;">
      <img src="https://github.com/user-attachments/assets/db87b1de-34c0-49cb-b5c5-d154e6ea77f6"  width="220" />
    </td>
    <td align="center" style="padding: 16px;">
      <img src="https://github.com/user-attachments/assets/fb2468f5-5c37-4660-83b1-93621039f3fc" height="450" width="220"/>
    </td>
  </tr>
</table>

</div>


## ✨ Features

- ⚡️ Light / Dark / System theme support
- 🍏 Dynamic iOS color adaptation
- 💾 MMKV-based persistent theme storage
- 🧠 Memoized themed styles with createThemedStyles
- 🔐 Type-safe access to theme tokens (with autocomplete)
- 🚀 Scalable for monorepos and multi-app setups
- 🧩 Extendable (spacing, typography, shadows, etc.)

> ✅ **iOS**: theme changes apply instantly  
> 🔁 **Android**: theme changes apply on app restart

## 📦 Installation

```bash
# npm
npm install theme-csx

# yarn
yarn add theme-csx

# pnpm
pnpm add theme-csx
```

# 🚀 Quick Start

### 1. Define your own theme

Create your own `theme` object.

> It **must** include a `colors.light` and `colors.dark` object. Everything else (e.g. spacing, typography, radius) is **optional and customizable**.

```ts
// theme/theme.ts

export const theme = {
  colors: {
    light: {
      background: '#ffffff',
      text: '#111111',
    },
    dark: {
      background: '#000000',
      text: '#ffffff',
    },
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  // Add any other tokens you want (typography, radius, etc.)
};
```

### 2. Create your theme system

Use `createAppTheme()` to initialize your theming system.

> This should be called **only once** in your app to avoid unexpected behavior.

You can enable persistent theme mode storage (optional) by setting `{ storage: true }`.

> ⚠️ Requires [`react-native-mmkv`](https://github.com/mrousavy/react-native-mmkv) if storage is enabled.

```ts
// theme/index.ts

import { createAppTheme } from 'theme-csx';
import { theme } from './theme';

export const {
  AppThemeProvider,
  useTheme,
  useThemeMode,
  useSetThemeMode,
  useResetThemeMode,
  useToggleThemeMode,
  createThemedStyles,
} = createAppTheme(theme, {
  storage: true, // Optional: disables persistence if omitted or set to false
});
```

### 3. Wrap your app

Wrap your app with `AppThemeProvider` and you are all set 🚀.

```ts
// App.tsx
import { AppThemeProvider } from '@theme';

export default function App() {
  return (
    <AppThemeProvider>
      {/* your app code */}
    </AppThemeProvider>
  );
}
```

# 🎨 Usage

### - Access current theme

```ts
import { useTheme } from '@theme';

const MyComponent = () => {
  const theme = useTheme();
  return <View style={{ backgroundColor: theme.colors.background }} />;
};
```

### - Themed & Static Styles (Responsive vs Fixed)

```ts
import { View, Text } from 'react-native';
import { createThemedStyles, createStaticStyles } from '@theme';

// 🎨 Styles that respond to theme mode (light/dark/system)
const useThemedStyles = createThemedStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  text: {
    color: theme.colors.text,
  },
}));

// 🧱 Styles that use theme tokens but remain static across theme modes
const staticStyles = createStaticStyles((theme) => ({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.light.primary, // fixed value from light mode
  },
}));

const MyComponent = () => {
  const styles = useThemedStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        I react to theme mode changes
      </Text>
      <Text style={staticStyles.text}>
        I stay the same across all modes
      </Text>
    </View>
  );
};
```

### - Toggle theme mode

```ts
import { useToggleThemeMode  } from '@theme';

const ToggleButton = () => {
  const toggleTheme = useToggleThemeMode();

  return <Button title="Toggle Theme" onPress={toggleTheme} />;
};

```

### 🔧 Other Utilities

Once you initialize your theme system with `createAppTheme()`, you get access to the following utilities:

| Utility                | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `useTheme()`           | Access the current theme (`colors`, `colorMode`, and custom tokens).         |
| `useThemeMode()`       | Get the current theme mode (`light`, `dark`, or `system`).                   |
| `useSetThemeMode()`    | Change the theme mode programmatically.                                      |
| `useResetThemeMode()`  | Reset to system theme mode (and clear stored preference if `storage: true`). |
| `useToggleThemeMode()` | Toggle strictly between `light` and `dark` modes.                            |
| `useCycleThemeMode()`  | Cycle through modes: `light → dark → system → light`.                        |
| `createThemedStyles()` | Create memoized themed styles using your theme object.                       |
| `createStaticStyles()` | Create static styles using your theme object.(non-reactive)                  |

All of these must be used **within** your `AppThemeProvider` tree.

# 🧩 Best Practices

✅ Always wrap your app in `AppThemeProvider`

✅ Use `useTheme()` for direct access to the theme

✅ Use `createThemedStyles()` for most of your app — these styles respond to light/dark mode and adapt dynamically.

✅ Use `createStaticStyles()` only when you need styles that remain fixed across all theme modes but still leverage theme tokens.

💡 Define `createThemedStyles()` and `createStaticStyles()` **outside** of components for maximum efficiency & performance

🚫 Do not call `createAppTheme()` more than once per app


## 📜 License

MIT © KJ-GM
