import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "../features/connectionSlice";
import userDataReducer from "../features/userDataSlice";

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
