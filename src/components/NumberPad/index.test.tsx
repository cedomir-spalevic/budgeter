/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render } from '@testing-library/react-native';
import NumberPad from "./";
import { ThemeProvider } from "context";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <NumberPad onChange={() => {}} />
      </ThemeProvider>
   );
});