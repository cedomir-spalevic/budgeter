/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render } from '@testing-library/react-native';
import Icon from "./";
import { ThemeProvider } from "context";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <Icon name="Test" />
      </ThemeProvider>
   );
});