import React from "react";
import { render, waitFor } from '@testing-library/react-native';
import * as apiFetch from "services/external/api/apiFetch";
import AuthProvider from "./";
import { AuthResponse } from "services/external/api/models/responses";
import { UnauthorizedError } from "services/external/api/models/errors";


it("renders correctly", async () => {
   await waitFor(() => render(<AuthProvider> </AuthProvider>));
});
it("verification fails immediately", async () => {
   const refreshMock = jest.spyOn(apiFetch, "refresh");
   refreshMock.mockImplementation(() => {
      throw new UnauthorizedError();
   });
   await waitFor(() => render(<AuthProvider> </AuthProvider>));
});