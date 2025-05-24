import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/AuthSlice";
import cartReducer from "../redux/CartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;