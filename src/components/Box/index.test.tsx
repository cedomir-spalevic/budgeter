import React from "react";
import { Text } from "react-native";
import { render } from '@testing-library/react-native';
import { ThemeProvider } from "context";
import Box from "./";

it("renders correctly", () => {
   render(
      <ThemeProvider>
         <Box>
            <Text>Test</Text>
         </Box>
      </ThemeProvider>
   );
});