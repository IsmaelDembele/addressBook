import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectionState {
  value: boolean;
  token: string;
}

interface ILogin {
  connected: boolean;
  token: string;
}

const initialState: ConnectionState = {
  value: false,
  token: "",
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<ILogin>) => {
      state.value = action.payload.connected;
      state.token = action.payload.token;
    },

    logOutUser: state => {
      state.value = false;
      state.token = "";
    },
  },
});

export const { logInUser, logOutUser } = connectionSlice.actions;

export default connectionSlice.reducer;
