import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  user: {
    username: string;
    email: string;
  } | null;
  access_token: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  access_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        access_token: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
      };
      state.access_token = action.payload.access_token;
      
      localStorage.setItem("access_token", state.access_token);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.access_token = null;

      localStorage.removeItem("access_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
