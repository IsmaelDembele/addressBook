import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IContact {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  note: string;
}

interface EditContactType {
  value: boolean;
  index: number;
}

interface UserDataState {
  email: string;
  contactList: IContact[];
  editContact: EditContactType;
}

const initialState: UserDataState = {
  email: "",
  contactList: [
    {
      firstname: "Ismael",
      lastname: "Dembele",
      email: "dembele@gmail.com",
      phone: "757 224 1454",
      address: "12345 Mcknight Dr, Pittsburgh PA 15237",
      note: "I met him in Newport News Va",
    },
    {
      firstname: "Amadou",
      lastname: "Dembele",
      email: "amadou@gmail.com",
      phone: "757 224 4457",
      address: "1 Washington blv, Newport News VA 23608",
      note: "I met him in Houston, TX",
    },
  ],
  editContact: {
    value: false,
    index: -1,
  },
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    connectedUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    addNewContact: (state, action: PayloadAction<IContact>) => {
      if (action.payload !== null) {
        state.contactList.push(action.payload);
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

export const { connectedUser, addNewContact, removeContact, setEdit } = userDataSlice.actions;

export default userDataSlice.reducer;
