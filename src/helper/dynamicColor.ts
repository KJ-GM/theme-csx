import { ColorValue, DynamicColorIOS } from 'react-native';

/**
 * @memberof IOS - Dynamic color
 */
const dynamicColorIOS = (
  color: ColorValue,
  colorDark: ColorValue,
  defaultColor?: ColorValue
) => {
  const customDynamicColor = DynamicColorIOS({
    dark: colorDark,
    light: color ? color : defaultColor ? defaultColor : 'black',
  });
  return customDynamicColor;
};

export default dynamicColorIOS;
