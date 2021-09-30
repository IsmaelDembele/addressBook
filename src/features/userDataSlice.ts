import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IContact {
  id: number;
  useremail: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  note: string;
}

interface EditContactType {
  value: boolean;
  id: number;
}

interface UserDataState {
  email: string;
  contactList: IContact[];
  editContact: EditContactType;
}

const initialState: UserDataState = {
  email: "",
  contactList: [],
  editContact: {
    value: false,
    id: -1,
  },
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    initContactList: (state, action: PayloadAction<IContact[]>) => {
      state.contactList = action.payload;
    },
    connectedUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    addNewContact: (state, action: PayloadAction<IContact>) => {
      if (action.payload !== null) {
        console.log(JSON.stringify(action.payload, undefined, 2));
        state.contactList.push(action.payload);
        console.log(JSON.stringify(state, undefined, 2));
      }
    },
    removeContact: (state, action: PayloadAction<number>) => {

      state.contactList.splice(action.payload, 1);
    },
    setEdit: (state, action: PayloadAction<EditContactType>) => {
      state.editContact = action.payload;
    },
  },
});

export const {
  connectedUser,
  addNewContact,
  removeContact,
  setEdit,
  initContactList,
  // setEditAndRemoveContact,
} = userDataSlice.actions;

export default userDataSlice.reducer;
