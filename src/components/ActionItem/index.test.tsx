import "react-native";
import renderer from "react-test-renderer";
import React from "react";
import ActionItem from "./";
import { ThemeProvider } from "context";

it("renders correctly", () => {
   renderer.create(
      <ThemeProvider>
         <ActionItem title="Hello" />
      </ThemeProvider>
   );
});
