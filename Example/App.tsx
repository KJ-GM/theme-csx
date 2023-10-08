import * as React from 'react';
import {
  Appearance,
  TouchableOpacity,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {appearanceHook, T, StyleSheet, TV} from 'theme-csx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Stack Navigator - React Navigation
const Stack = createNativeStackNavigator();

// App main
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: TV('#F8F8FF', 'black'),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: TV('black', 'white'),
            },
          }}
        />
        <Stack.Screen
          name="Demo"
          component={DemoScreen}
          options={{
            title: 'Demo',
            headerStyle: {
              backgroundColor: TV('#F8F8FF', 'black'),
            },
            headerTintColor: TV('black', 'white'),
            headerTitleStyle: {
              fontWeight: 'bold',
              color: TV('black', 'white'),
            },
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Screens ->
function HomeScreen({navigation}: any) {
  // Theme switch
  const switchTheme = () => {
    switch (appearanceHook.activeTheme) {
      case 'dark':
        appearanceHook.switch('light');
        break;
      case 'light':
        appearanceHook.switch('system');
        break;
      default:
        appearanceHook.switch('dark');
        break;
    }
  };

  // StatusBar changes
  const TStatusBar =
    appearanceHook.activeTheme === 'dark'
      ? 'light-content'
      : appearanceHook.activeTheme === 'system' &&
        Appearance.getColorScheme() === 'dark'
      ? Platform.OS !== 'ios'
        ? 'light-content'
        : 'default'
      : 'dark-content';

  const TBGStatusBar =
    Platform.OS === 'android'
      ? appearanceHook.activeTheme === 'dark'
        ? 'black'
        : appearanceHook.activeTheme === 'system' &&
          Appearance.getColorScheme() === 'dark'
        ? 'black'
        : 'white'
      : undefined;

  return (
    <View style={T(styles.container)}>
      <StatusBar
        animated={false}
        backgroundColor={TBGStatusBar}
        barStyle={TStatusBar}
      />
      <TouchableOpacity onPress={switchTheme} style={T(styles.themedBlock)}>
        <Text style={T(styles.themedText)}>Current Theme: </Text>
        <Text style={styles.normalText}>{appearanceHook.activeTheme}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Demo')}
        style={T(styles.themedBlock)}>
        <Text style={T(styles.themedText)}>Move Page</Text>
      </TouchableOpacity>
    </View>
  );
}

function DemoScreen() {
  return (
    <View style={T(styles.container)}>
      <Text style={T(styles.themedText)}>Hello I am themed text</Text>
      <Text style={[styles.normalText, {marginTop: 20}]}>
        Hello I am normal text
      </Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundDark: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themedText: {
    color: 'black',
    colorDark: 'white',
  },
  normalText: {
    color: '#BB86FC',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  themedBlock: {
    backgroundColor: '#F8F8FF',
    backgroundDark: '#212121',
    height: 100,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    flexDirection: 'row',
    marginBottom: 60,
  },
});

export default App;
