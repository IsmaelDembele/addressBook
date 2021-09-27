// import React from "react";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../app/store";
import { addNewContact, setEdit, removeContact } from "../../features/userDataSlice";

const initialContactState = {
  useremail: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  note: "",
};

const AddContact = () => {
  const [newContact, setNewContact] = useState(initialContactState);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userData);
  const history = useHistory();

  useEffect(() => {
    if (user.editContact.value) {
      const { contactList, editContact } = user;
      setNewContact(contactList[editContact.index]);
      dispatch(setEdit({ value: false, index: editContact.index }));
      dispatch(removeContact(editContact.index));
    }
  }, [user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewContact(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newContact?.firstname === null) return;
    dispatch(addNewContact(newContact));
    setNewContact(initialContactState);
    history.push("/"); // this will redirect to the viewContact page
  };

  return (
    <div className="account__add-contact">
      <div className="account__add-title">Add the new contact information</div>
      <form action="#" className="account__form">
        <div className="account__add-fname">
          <TextField
            id="cFName"
            label="Firt Name"
            variant="outlined"
            size="small"
            type="text"
            name="firstname"
            value={newContact.firstname}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="account__add-lname">
          <TextField
            id="cLName"
            label="Last Name"
            variant="outlined"
            size="small"
            type="text"
            name="lastname"
            value={newContact.lastname}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="account__add-email">
          <TextField
            id="cEmail"
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            name="email"
            value={newContact.email}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="account__add-phone">
          <TextField
            id="cPhone"
            label="Phone number"
            variant="outlined"
            size="small"
            type="tel"
            name="phone"
            value={newContact.phone}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="account__add-address">
          <TextField
            id="cAdresse"
            label="Address"
            variant="outlined"
            size="small"
            type="text"
            name="address"
            value={newContact.address}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="account__add-note">
          <textarea
            rows={5}
            placeholder="Add note"
            onChange={e => handleChange(e)}
            name="note"
            value={newContact.note}
          />
        </div>
        <button className="btn" onClick={e => handleClick(e)}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddContact;
