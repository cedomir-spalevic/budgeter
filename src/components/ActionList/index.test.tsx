import React from "react";
import { render } from '@testing-library/react-native';
import { ThemeProvider } from "context";
import ActionList from "./";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <ActionList items={[]} />
      </ThemeProvider>
   );
});