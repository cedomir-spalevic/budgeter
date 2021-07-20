/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render } from '@testing-library/react-native';
import Header from "./";
import { StackHeaderProps } from "./types";
import { ThemeProvider } from "context";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const defaultProps: StackHeaderProps = {
   mode: "screen",
   layout: {
      width: 100,
      height: 100
   },
   insets: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
   },
   scene: {
      route: {},
      descriptor: {},
      progress: {
         current: 0
      }
   },
}

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <Header {...defaultProps} />
      </ThemeProvider>
   );
});