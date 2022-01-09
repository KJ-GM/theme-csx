import type { NamedStyles } from 'src/types';

namespace StyleSheet {
  /**
   * Creates a StyleSheet style reference from the given object.
   */
  export function create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ): T | NamedStyles<T> | NamedStyles<any> {
    return styles;
  }
}

export default StyleSheet;
