/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { Text } from "react-native";
import { render } from '@testing-library/react-native';
import SwipeContainer from "./";
import { ThemeProvider } from "context";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <SwipeContainer side="left" color="#000" icon={<Text>Test</Text>}> 

         </SwipeContainer>
      </ThemeProvider>
   );
});