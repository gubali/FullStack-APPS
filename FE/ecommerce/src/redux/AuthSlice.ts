import { createSlice } from "@reduxjs/toolkit";

let savedUser = null;

try {
  const rawUser = localStorage.getItem("username");
  savedUser = rawUser ? JSON.parse(rawUser) : null;
  //   if (rawUser && rawUser !== "undefined") {
  //     savedUser = JSON.parse(rawUser);
  //   } else {
  //     savedUser = null;
  //   }
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
  savedUser = null;
}

const initialState = {
  isLoggedIn: !!savedUser,
  user: savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Login action payload:", action.payload);
      // Payload directly contains userName and password
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("username", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
