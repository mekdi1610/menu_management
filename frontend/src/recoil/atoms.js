import { atom } from 'recoil';

export const menuState = atom({
  key: 'menuState',
  default: [],
});

export const selectedMenuItemState = atom({
  key: 'selectedMenuItemState',
  default: null,
});
