// mocks

jest.mock('@expo/react-native-action-sheet', () => ({
  connectActionSheet: () => 'ActionSheet'
}));
