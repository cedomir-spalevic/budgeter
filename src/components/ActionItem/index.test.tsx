import React from "react";
import { Text } from "react-native";
import { render } from '@testing-library/react-native';
import ActionItem from "./";
import { ThemeProvider } from "context";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <ActionItem title="Hello" />
      </ThemeProvider>
   );
});

it("renders with title and action", () => {
   render(
      <ThemeProvider>
         <ActionItem title="Hello" action="Action" />
      </ThemeProvider>
   )
});

it("renders with title, action and children", () => {
   render(
      <ThemeProvider>
         <ActionItem title="Hello" action="Action">
            <Text>Test</Text>
         </ActionItem>
      </ThemeProvider>
   )
});