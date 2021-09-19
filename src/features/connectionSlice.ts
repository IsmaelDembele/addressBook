import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectionState {
  value: boolean;
}

interface Login {
  email: string;
  password: string;
}

const initialState: ConnectionState = {
  value: false,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<Login>) => {
      if (action.payload.email === "hi@hi.com" && action.payload.password === "12345") {
        
        state.value = true;
      } else {
        state.value = false;
      }
    },

    logOutUser: state => {
      state.value = false;
    },
  },
});

export const { logInUser, logOutUser } = connectionSlice.actions;

export default connectionSlice.reducer;
