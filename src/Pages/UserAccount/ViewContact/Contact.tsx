import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IContact } from "../data";
import { removeContact, setEdit } from "../../../features/userDataSlice";
import { useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { RootState } from "../../../app/store";

// import { RootState } from "../../../app/store";

interface ContactType {
  contact: IContact;
  index: number;
}

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContactMutation($token: String!, $id: Int!) {
    deleteContact(token: $token, id: $id)
  }
`;

const Contact: React.FC<ContactType> = ({ contact, index }) => {
  const { id /** useremail,*/,  firstname, lastname, email, phone, address, note } = contact;
  const [deleteContact, { data, /*loading, error*/ }] = useMutation(DELETE_CONTACT_MUTATION);

  const dispatch = useDispatch();
  const connection = useSelector((state: RootState) => state.connection);
  const history = useHistory();

  useEffect(() => {
    console.log("loop test contact");
    
    if (data?.deleteContact) dispatch(removeContact(index));
  }, [data,dispatch,index]);

  const handleDelete = (index: number) => {
    console.log("removing data");

    deleteContact({
      variables: {
        token: connection.token,
        id: id,
      },
    });

    // dispatch(removeContact(index));
  };

  const handleEdit = () => {
    console.log("handleedit");

    dispatch(setEdit({ value: true, index: index }));
    history.push("/account");
  };

  return (
    <div className="account__user-display">
      <div className="account__fullname-display">{`${firstname} ${lastname}`}</div>
      <div className="account__info">
        <p className="account__email-display">Email : </p>
        <p className="account__info-value">{email}</p>
        <p className="account__phone-display">Phone #:</p>
        <p className="account__info-value">{phone}</p>

        <p className="account__address-display">Address:</p>
        <p className="account__info-value">{address}</p>

        <p className="account__note-display">Note:</p>
        <p className="account__info-value">{note}</p>
      </div>
      <div className="account__btn">
        <button className="btn" onClick={() => handleDelete(index)}>
          delete
        </button>
        <button className="btn" onClick={() => handleEdit()}>
          edit
        </button>
      </div>
    </div>
  );
};

export default Contact;
