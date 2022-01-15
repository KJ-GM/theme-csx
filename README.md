![image](https://user-images.githubusercontent.com/52489083/149637586-f0c3b5ce-6b99-431f-b821-7ca1e208073e.png)

![NPM Downloads](https://img.shields.io/npm/dw/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge)

# 🚀 Features 
🌟 **New**: Any changes to the phone _`appearance`_ preference while the app is running will be applied dynamically.
- Similar to standard react native styling, but with additional props that can be added to make it themeable.
- Can be implemented for Views + Texts + Images + Icons...
- Light & Fast
- Expo & ReactNative
- Typescript & JavaScript 

## ✅ Installation 

```sh
npm install theme-csx
```


```sh 
yarn add theme-csx
```
## 📝 Get Started

### _Three Steps:_

> **StyleSheet**

- Is similar to the usual styling format, but now you have additional props to make style themeable.

> **T() Function**

- Apply **only** your themed styles using the T() function wrapper.

> **appearanceHook**

- Use the appearanceHook to switch theme from anywhere in your app.


## Usage ❓

```js

// Styles
import { StyleSheet, T, appearanceHook} from "theme-csx";

// Components 
import { Text, View } from 'react-native';
import { Button } from '@components/atoms';

const DemoComponent = () => {

// Theme switch
const switchTheme = () => {
   appearanceHook.switch(appearanceHook.activeTheme === 'dark' ? 'light' : 'dark')
}

return (
   <View style={T(styles.THEMED_CONTAINER)}>
   
      <Text style={styles.NORMAL_TEXT}>Hey, I am normal text</Text>
      
      <Text style={T(styles.THEMED_TEXT)}>Hey, I am themed text</Text>
      
      <Button text={'Switch theme'} onPress={switchTheme} />
   
   </View>
)}


const styles = StyleSheet.create({
    THEMED_CONTAINER: {
    flex: 1,
    backgroundColor: 'white',
    backgroundDark: 'gray', // backgroundDark porp was added to make it themeable
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
   colorDark: 'white'  // colorDark porp was added to make it themeable
   },
})

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

**🌓 Expo**: To make the system preference work, make sure `"userInterfaceStyle": "automatic"` is added to app.json

## License

Apache-2.0 License 
