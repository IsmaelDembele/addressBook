import { useEffect, useState } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddContact from "./AddContact";
import ViewContact from "./ViewContact/index";
// import {data} from './data';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useQuery, gql } from "@apollo/client";
import { initContactList } from "../../features/userDataSlice";

const options = {
  ADDCONTACT: "addContact",
  VIEWCONTACT: "viewContact",
};

const GET_CONTACTS_QUERY = gql`
  query Query($useremail: String!) {
    getContacts(useremail: $useremail) {
      id
      useremail
      firstname
      lastname
      email
      phone
      address
      note
    }
  }
`;

const UserAccount = () => {
  const [type, setType] = useState<String>(options.VIEWCONTACT);
  const user = useSelector((state: RootState) => state.userData);
  // const edit = useSelector((state: RootState) => state.userData.editContact);

  const { /*loading, error,*/ data, refetch } = useQuery(GET_CONTACTS_QUERY, {
    variables: { useremail: user.email },
  });

  const dispatch = useDispatch();

  //get data from back-end and pass it to userData

  useEffect(() => {
    console.log("loop test userAccount index");

    refetch({
      useremail: user.email,
    });
    if (user.editContact.value) {
      setType(options.ADDCONTACT);
    }
  }, [user.editContact, refetch, user.email]);

  useEffect(() => {
    dispatch(initContactList(data?.getContacts));
  }, [data, dispatch]);

  const handleAddContact = (): void => {
    setType(options.ADDCONTACT);
  };

  const handleContactList = (): void => {
    setType(options.VIEWCONTACT);
  };

  return (
    <section className="account">
      <div className="account__menu-bar">
        <div className="account__search-bar">
          <input type="text" name="" id="" className="account__search-bar__input" />
          <SearchRoundedIcon className="account__search-bar__button" />
        </div>
        <div className="account__menu-contact" onClick={() => handleAddContact()}>
          add contact
        </div>
        <div className="account__menu-viewContacts" onClick={() => handleContactList()}>
          view contact
        </div>
      </div>

      {type === options.ADDCONTACT && <AddContact />}

      {type === options.VIEWCONTACT && <ViewContact data={user.contactList} />}
    </section>
  );
};

export default UserAccount;
