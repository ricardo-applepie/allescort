// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: any[];
  stsTokenManager: any;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

interface IAuthState {
  user: User | null;
}

const initialState: IAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearAuthState: (state) => {
      state.user = null
    }
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
