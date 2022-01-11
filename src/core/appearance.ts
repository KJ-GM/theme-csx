import { types } from 'mobx-state-tree';
import type { themeTypes } from '../types';

/**
 * Appearance Hook Model.
 */
export const AppearanceModel = types
  .model('Appearance')
  .props({
    theme: types.enumeration(['system', 'light', 'dark']),
  })
  .views((self) => ({
    get activeTheme() {
      return self.theme;
    },
  }))
  .actions((self) => ({
    switch(theme: themeTypes) {
      self.theme = theme;
    },
  }));

const appearanceHook = AppearanceModel.create({
  theme: 'system',
});

export default appearanceHook;
