![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x3nsxwazndhbo79avwxi.png)
# theme-csx

A utility React Native theming framework for rapidly building themeable components.

# Features

- Similar to standard react native styling, but with additional props that can be added to make it themeable.
- Behind the scenes, memoization has been optimized for maximum performance.
- Can be implemented for Views + Texts + Images + Icons...
- Light & Fast
- Expo & react native
- Typescript & JavaScript 

## Installation

```sh
npm install theme-csx
```


```sh 
yarn add theme-csx
```

## Usage

```js

import { useState } from 'react';

// Styles
import { StyleSheet, appearanceHook, t} from "theme-csx";

// Components 
import { Text, View } from 'react-native';
import { Button } from '@components/atoms';

const DemoComponent = () => {

// Theme state
const [theme, setTheme] = useState(appearanceHook.activeTheme)

// Theme switch
const switchTheme = () => {
   appearanceHook.switch(appearanceHook.activeTheme === 'dark' ? 'light' : 'dark')
   setTheme(theme === 'dark' ? 'light' : 'dark')
}

return (
   <View style={t(styles.THEMED_CONTAINER)}>
   
      <Text style={styles.NORMAL_TEXT}>Hey, I am normal text</Text>
      
      <Text style={t(styles.THEMED_TEXT)}>Hey, I am themed text</Text>
      
      <Button text={'Switch theme'} onPress={switchTheme} />
   
   </View>
)}


const styles = StyleSheet.create({
    THEMED_CONTAINER: {
    flex: 1,
    backgroundColor: 'white',
    backgroundDark: 'gray',
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
   colorDark: 'white'
   },
})

```
## Get Started

**Imports Usage:** 
  
> **StyleSheet:**

- StyleSheet can be used as the normal styling way, but now you can have extra props to make it themeable if you wish. 

> **t() Function**

- t() function should be used to apply themed styles only 

> **appearanceHook**

- appearanceHook is used to toggle and switch the theme:  _system_, _light_, _dark_

---

**Themed Style types:** 


> TViewStyle:

- Has the following extra props: _backgroundDark_, _borderDark_ 

> TTextStyle:

- Has the following extra props: _colorDark_, _backgroundDark_, _borderDark_ 


> TImageStyle:

- Has the following extra props: _tintColorDark_, _backgroundDark_, _borderDark_ 


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
