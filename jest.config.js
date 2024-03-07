module.exports = {
  preset: 'react-native',
  verbose:false,
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|@react-native-community/blur|react-native-date-picker|react-native-vector-icons|react-native-reanimated|react-redux|react-native-toast-message)/)',
  ],
};
