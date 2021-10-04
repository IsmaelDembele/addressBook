import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setEdit, removeContact } from "../../features/userDataSlice";
import {
  entryCheck,
  ERROR_INITIAL_VALUE,
  FIELDS,
  IContact,
  IError,
  NAME_LENGTH_MIN,
} from "../../helper/helper";

const INITIAL_CONTACT_STATE = {
  id: -1,
  useremail: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  note: "",
};

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContactMutation($token: String!, $id: Int!) {
    deleteContact(token: $token, id: $id)
  }
`;

const ADD_CONTACT_MUTATION = gql`
  mutation Mutation(
    $useremail: String!
    $firstname: String
    $lastname: String
    $email: String
    $phone: String
    $address: String
    $note: String
  ) {
    addContact(
      useremail: $useremail
      firstname: $firstname
      lastname: $lastname
      email: $email
      phone: $phone
      address: $address
      note: $note
    )
  }
`;

const AddContact = () => {
  const [newContact, setNewContact] = useState<IContact>(INITIAL_CONTACT_STATE);
  const [myError, setMyError] = useState<IError>(ERROR_INITIAL_VALUE);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userData);
  const connection = useSelector((state: RootState) => state.connection);
  const history = useHistory();
  const [addContact, { loading }] = useMutation(ADD_CONTACT_MUTATION);
  const [deleteContact, { loading: delete_loading }] = useMutation(DELETE_CONTACT_MUTATION);

  useEffect(() => {
    //if the user click on edit inside contact.tsx
    if (user.editContact.value) {
      const { contactList, editContact } = user;

      const index = contactList.findIndex(Element => {
        return Element.id === editContact.id;
      });
      setNewContact(contactList[index]);
    }
  }, [user, dispatch, connection.token, deleteContact]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    let test = false;

    if (name === FIELDS.FIRSTNAME) {
      test = value.length >= NAME_LENGTH_MIN || value === "";
    }
    entryCheck(setMyError, name, test);
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (user.editContact) {
      dispatch(setEdit({ value: false, id: user.editContact.id }));
      dispatch(removeContact(user.editContact.id));
      deleteContact({
        variables: {
          token: connection.token,
          id: user.editContact.id,
        },
      });
    }
    //we filled the useremail fields for the user so that he does not have to enter his own email
    //each time he wants to add a new contact
    setNewContact(prev => ({ ...prev, useremail: user.email }));

    if (newContact?.firstname.length < NAME_LENGTH_MIN) {
      setMyError(prev => ({ ...prev, firstname: true }));
      return;
    }
    // add new contact to the database
    await addContact({
      variables: {
        useremail: user.email,
        firstname: newContact.firstname,
        lastname: newContact.lastname,
        email: newContact.email,
        phone: newContact.phone,
        address: newContact.address,
        note: newContact.note,
      },
    });
    //reset the contact fields
    setNewContact(INITIAL_CONTACT_STATE);
    // this will redirect to the viewContact page, and get updated contact list from the database
    history.push("/");
  };

  return (
    <div className="account__add-contact">
      {(loading || delete_loading) && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      <div className="account__add-title">Add the new contact information</div>
      <form action="#" className="account__form">
        <div className="account__add-fname">
          <TextField
            id="cFName"
            label="Firt Name"
            variant="outlined"
            size="small"
            type="text"
            name={FIELDS.FIRSTNAME}
            value={newContact.firstname}
            required
            error={myError.firstname}
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
            name={FIELDS.LASTNAME}
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
            name={FIELDS.EMAIL}
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
            name={FIELDS.PHONE}
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
            name={FIELDS.ADDRESS}
            value={newContact.address}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="account__add-note">
          <textarea
            rows={5}
            placeholder="Add note"
            onChange={e => handleChange(e)}
            name={FIELDS.NOTE}
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
