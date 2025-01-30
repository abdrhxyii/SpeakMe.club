// import Toast from 'react-native-simple-toast';

// /**
//  * Show a toast message
//  * @param {string} message - The message to display
//  * @param {string} [duration="SHORT"] - Duration of the toast ('SHORT' or 'LONG')
//  * @param {string} [position="BOTTOM"] - Position of the toast ('TOP', 'CENTER', or 'BOTTOM')
//  */
// export const showToast = (
//   message: string,
//   duration: 'SHORT' | 'LONG' = 'SHORT',
//   position: 'TOP' | 'CENTER' | 'BOTTOM' = 'BOTTOM'
// ) => {
//   const durationType = duration === 'SHORT' ? Toast.SHORT : Toast.LONG;
  
//   // Positioning logic based on the position argument
//   if (position === 'TOP') {
//     Toast.showWithGravity(message, durationType, Toast.TOP);
//   } else if (position === 'CENTER') {
//     Toast.showWithGravity(message, durationType, Toast.CENTER);
//   } else {
//     Toast.showWithGravity(message, durationType, Toast.BOTTOM);
//   }
// };


import Toast from 'react-native-root-toast';

const defaultOptions = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
};

/**
 * Show a toast message
 * @param {string} message - The message to display in the toast.
 * @param {object} options - Additional options to customize the toast.
 */
const showToast = (message: string, options = {}) => {
  Toast.show(message, { ...defaultOptions, ...options });
};

export default showToast;
