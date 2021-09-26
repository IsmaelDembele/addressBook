import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectionState {
  value: boolean;
}

// interface Login {
//   email: string;
//   password: string;
// }

const initialState: ConnectionState = {
  value: false,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },

    logOutUser: state => {
      state.value = false;
    },
  },
});

export const { logInUser, logOutUser } = connectionSlice.actions;

export default connectionSlice.reducer;
