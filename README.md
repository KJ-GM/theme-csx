![image](https://user-images.githubusercontent.com/52489083/149637586-f0c3b5ce-6b99-431f-b821-7ca1e208073e.png)

<!-- this is a comment
![NPM Downloads](https://img.shields.io/npm/dy/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge)


**`IOS`**: theme chanes will show immediately!

**`Android`**: theme chanes will show after app reopened!
 -->

![NPM Downloads](https://img.shields.io/npm/dy/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![Status - active](https://img.shields.io/badge/Status-active-blueviolet?logo=GIthub&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) 


:last_quarter_moon: **Youtube Tutorial**: https://youtu.be/wW20AkwmGMk

#

<table align="center">
   <thead>
      <tr>
         <th>IOS</th>
         <th>Android</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><img src="https://github.com/KJ-GM/theme-csx/blob/master/RPReplay-Final1644961619.gif" alt="Showcase iOS" width="234" height="433"> </td>
                  <td><img src="https://user-images.githubusercontent.com/52489083/155139274-36543351-0585-46fd-ab81-1c254bf3020b.gif" alt="Showcase Android" width="234" height="439"></td>
      </tr>
   </tbody>
</table>

# 🚀 Features

- Similar to standard react native styling, but with additional props that can be added to make it themeable.
- Can be implemented for Views + Texts + Images + Icons...
- Light & Fast.
- Expo & React Native.
- Supports React Navigation.

🌟 **System**: changes to the phone _`appearance`_ preference while the app is running will be applied dynamically.

- **IOS:** changes will be shown _`immediately`_ without the need to reopen the app.

## ✅ Installation

```sh
npm install theme-csx
```

```sh
yarn add theme-csx
```

## 📝 Get Started

> **StyleSheet**

- Is similar to the usual styling format, but now you have additional props to make style themeable.

> **T() - Themed Function**

- Apply **only** your themed styles using the T() function wrapper.

> **TV() - Themed Value Function**

- Is an extra helper function that can be used to theme a specific value. (it becomes useful with react navigation)

> **appearanceHook**

- Use the appearanceHook to switch theme from anywhere in your app.

**🌓 Expo**: To make the system preference work, make sure `"userInterfaceStyle":"automatic"` is added to app.json

## Usage ❓

```js
// Styles
import { StyleSheet, T, appearanceHook } from 'theme-csx';

// Components
import { Text, View } from 'react-native';
import { Button } from '@components/atoms';

const DemoComponent = () => {
  // Theme switch
  const switchTheme = () => {
    appearanceHook.switch(
      appearanceHook.activeTheme === 'dark' ? 'light' : 'dark'
    );
  };

  return (
    <View style={T(styles.THEMED_CONTAINER)}>
      <Text style={styles.NORMAL_TEXT}>Hey, I am normal text</Text>

      <Text style={T(styles.THEMED_TEXT)}>Hey, I am themed text</Text>

      <Button text={'Switch theme'} onPress={switchTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  THEMED_CONTAINER: {
    flex: 1,
    backgroundColor: 'white',
    backgroundDark: 'gray', // backgroundDark prop was added to make it themeable
    alignItems: 'center',
    justifyContent: 'center',
  },
  NORMAL_TEXT: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'green',
  },
  THEMED_TEXT: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    colorDark: 'white', // colorDark prop was added to make it themeable
  },
});
```

## 🚦Theme Types:

> TViewStyle:

- Has the following extra props: `backgroundDark`, `borderDark`

> TTextStyle:

- Has the following extra props: `colorDark`, `backgroundDark`, `borderDark`

> TImageStyle:

- Has the following extra props: `tintColorDark`, `backgroundDark`, `borderDark`

> appearanceHook.switch():

- Has the following options: `system`, `light`, `dark`

## Sponsors
<a href="https://www.jetbrains.com/?from=Lighthouse-Badges">
  <img alt="Jetbrains Logo" src="https://raw.githubusercontent.com/emazzotta/lighthouse-badges/4ebebc4f41579e024ff72cfd20fb78a8d6f745b3/assets/img/jetbrains.svg" height="100">
</a>

## License

Apache-2.0 License
