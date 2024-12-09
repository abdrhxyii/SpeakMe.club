import * as NavigationBar from 'expo-navigation-bar';

export const setNavigationBarColor = async (color: string) => {
  await NavigationBar.setBackgroundColorAsync(color);
};
