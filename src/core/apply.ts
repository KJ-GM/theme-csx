import type { stylesType } from 'src/types';
import isThemedStyle from '../helper/themedStyle';
import Instance from './instance';

/**
 * @Theming Function
 *
 * @param Theme TTextStyle | TViewStyle | TImageStyle | TextStyle | ViewStyle | ImageStyle
 *
 * @returns {object}
 *
 */
const t = (args: stylesType): object | null => {
  // Check if input is compatible
  if (!isThemedStyle(args)) {
    console.error(
      'Theming Error: Style object passed is not of type TTextStyle | TViewStyle | TImageStyle'
    );
    return null;
  }
  // New Style instance
  const instanceStyle = new Instance();

  // Processed param
  let processedObject = {};
  let themed = false;

  // Process Styles of args
  Object.entries(args).map(([key, value]) => {
    processedObject = Object.assign({}, { [key]: value });
    // Check if there's any dark theme
    themed = instanceStyle.darkTheme(processedObject);
    // Generate style
    if (!themed) {
      instanceStyle.defineStyles(processedObject);
    }
  });
  // Return result object of styles
  return instanceStyle.getOutputStyle();
};

export default t;
