# theme-csx

An utility React Native theming framework for rapidly building themeable components.

# Features

- Similar to standard react native styling, but with additional props that can be added to make it themeable.
- Behind the scenes, memoization has been optimized for maximum performance.
- Can be implemented for Views + Texts + Images + Icons...
- Light & Fast

## Installation

```sh
npm install theme-csx
```


```sh 
yarn add theme-csx
```

## Usage

```js

import { StyleSheet, appearanceHook, t} from "theme-csx";

const DemoComponent = () => {

// Theme state
const [theme, setTheme] = useState(appearanceHook.activeTheme)

// Theme toggle 
const switchTheme = useCallback(() => {
   appearanceHook.switch(appearanceHook.activeTheme === 'dark' ? 'light' : 'dark')
   setTheme(theme === 'dark' ? 'light' : 'dark')
}, [appearanceHook.activeTheme])

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
