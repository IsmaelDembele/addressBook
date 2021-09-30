import { gql, useMutation } from "@apollo/client";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../app/store";
import { addNewContact, setEdit, removeContact } from "../../features/userDataSlice";

const initialContactState = {
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
  const [newContact, setNewContact] = useState(initialContactState);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userData);
  const connection = useSelector((state: RootState) => state.connection);
  const history = useHistory();
  const [addContact /*, { data: acData, loading: acLoading, error: acError }*/] =
    useMutation(ADD_CONTACT_MUTATION);
  const [deleteContact /**,{ data, loading, error } */] = useMutation(DELETE_CONTACT_MUTATION);

  useEffect(() => {
    console.log("test add contact useEffect");

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

    setNewContact(prev => ({
      ...prev,
      [name]: value,
    }));
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
    setNewContact(prev => ({
      ...prev,
      useremail: user.email,
    }));

    console.log(newContact);

    if (newContact?.firstname.length === 0 || user.email.length === 0) {
      return;
    }

    dispatch(addNewContact({ ...newContact, useremail: user.email }));

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
