/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render } from '@testing-library/react-native';
import { ThemeProvider } from "context";
import Button from "./";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <Button onPress={() => {}} text="Test" />
      </ThemeProvider>
   );
});

it("Calls on press props function", () => {
   const mockFn = () => {};
   render(
      <ThemeProvider>
         <Button onPress={mockFn} text="Test" />
      </ThemeProvider>
   );
   expect(mockFn).toBeCalled()
})