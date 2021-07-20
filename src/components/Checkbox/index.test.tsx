/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render } from '@testing-library/react-native';
import Checkbox from "./";
import { ThemeProvider } from "context";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <Checkbox checked={true} />
      </ThemeProvider>
   );
});

it("renders unchecked", () => {
   render(
      <ThemeProvider>
         <Checkbox checked={false} />
      </ThemeProvider>
   );
});

it("Changes on onChange fn", () => {
   const mockFn = () => {};
   render(
      <ThemeProvider>
         <Checkbox checked={false} onChange={mockFn} />
      </ThemeProvider>
   );
   expect(mockFn).toBeCalled()
})