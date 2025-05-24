import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser } from "../interface/ILoginResponse";
import type { AuthState } from "../interface/IAuthState";
// Load savedUser from localStorage
let savedUser: IUser | null = null;
try {
  const rawUser = localStorage.getItem("user");
  savedUser = rawUser ? JSON.parse(rawUser) : null;
} catch {
  savedUser = null;
}

const initialState: AuthState = {
  isLoggedIn: !!savedUser,
  user: savedUser,
  error: null,
};

export const loginUser = createAsyncThunk<
  IUser,
  { userName: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:9010/api/login", {
      userName: credentials.userName,
      password: credentials.password,
    });
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("Login response:", response.data.userName);
    const { token, role, userName } = response.data;
    const userData = { token, role, userName };
    console.log("User data:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      typeof error.response?.data?.message === "string"
        ? error.response.data.message
        : "Login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
