// Mock functions to set up globally

jest.mock("react-native-notifications", () => ({
   addEventListener: jest.fn(),
   requestPermissions: jest.fn()
}));
jest.mock("react-native-gesture-handler", () => ({
   Direction: {}
}));
jest.mock("react-native/Libraries/LogBox/LogBox");
