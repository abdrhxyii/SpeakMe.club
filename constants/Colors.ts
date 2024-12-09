/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// #EEECFE

// #9CE2DA
// #859CFF
// #E7F7D2

// #a091f5 - purple

// #142a19
//#224229
//#e8f5e3
//#99cca1

// purple card - #2b1c50 and #f0f1ff or #d1d1f7
// blue card - #1b224b and #dbf0ff
//green card - #e8f5e3 and #142a19
export const Colors = {
  light: { 
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    danger: '#ED1010',
    primary: '#000000',
    online: '#48ea18',
    offline: '',
    border: '#DDD',
    darkGray: '#a5a5a5',
    info: '#666',
    red: '#FF0800'
  },

  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
