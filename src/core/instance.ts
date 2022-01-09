import type { ColorValue } from 'react-native';
import darkThemeProcessor from '../processor/darkThemeProcessor';

/**
 * Instance class for each passed style
 */
export default class Instance {
  private _obj: object;
  private _bgDark?: ColorValue;
  private _borderDark?: ColorValue;
  private _textDark?: ColorValue;
  private _tintDark?: ColorValue;
  constructor() {
    this._obj = {};
    this._bgDark = undefined;
    this._borderDark = undefined;
    this._textDark = undefined;
    this._tintDark = undefined;
  }

  /**
   * Get defined styles
   * @param data
   */
  defineStyles(data: object) {
    this._obj = {
      ...this._obj,
      ...data,
    };
  }

  /**
   * Checking if it's using dark mode or not
   * @param style
   */
  darkTheme(style: any) {
    if (style) {
      if (style.hasOwnProperty('backgroundDark')) {
        this._bgDark = style.backgroundDark && style.backgroundDark;
        return true;
      }
      if (style.hasOwnProperty('borderDark')) {
        this._borderDark = style.borderDark && style.borderDark;
        return true;
      }
      if (style.hasOwnProperty('colorDark')) {
        this._textDark = style.colorDark && style.colorDark;
        return true;
      }
      if (style.hasOwnProperty('tintColorDark')) {
        this._tintDark = style.tintColorDark && style.tintColorDark;
        return true;
      }
    }
    return false;
  }
  /*
   * Get final styles object
   * @returns object
   */
  getOutputStyle() {
    this._obj = darkThemeProcessor(
      this._obj,
      this._bgDark,
      this._borderDark,
      this._textDark,
      this._tintDark
    );
    return this._obj;
  }
}
