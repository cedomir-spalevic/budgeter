/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { Text } from "react-native";
import { render } from '@testing-library/react-native';
import Container from "./";
import { ThemeProvider } from "context";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <Container>
            <Text>Test</Text>
         </Container>
      </ThemeProvider>
   );
});