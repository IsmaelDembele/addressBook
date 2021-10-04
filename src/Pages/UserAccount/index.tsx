import { useEffect, useState } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery, gql } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { initContactList } from "../../features/userDataSlice";
import { RootState } from "../../app/store";
import AddContact from "./AddContact";
import ViewContact from "./ViewContact/index";
import { FIELDS, IContact } from "../../helper/helper";

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
  const [type, setType] = useState<string>(options.VIEWCONTACT);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IContact[]>([]);
  const user = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();
  const { loading, data, refetch } = useQuery(GET_CONTACTS_QUERY, {
    variables: { useremail: user.email },
  });

  useEffect(() => {
    // get the updated contact from the database
    refetch({
      useremail: user.email,
    });
    //redirect to the addcontact page
    if (user.editContact.value) {
      setType(options.ADDCONTACT);
    }
  }, [user.editContact, refetch, user.email]);

  useEffect(() => {
    dispatch(initContactList(data?.getContacts));
  }, [data, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);

    // fiter the contact list by using only the first and last name of all contacts
    const _data = user.contactList.filter(contact => {
      return (contact.firstname + " " + contact.lastname).toLocaleLowerCase().includes(value);
    });

    setSearchResult(_data);
  };

  const handleAddContact = (): void => {
    setType(options.ADDCONTACT);
  };

  const handleContactList = (): void => {
    setType(options.VIEWCONTACT);
  };

  return (
    <section className="account">
      {loading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      <div className="account__menu-bar">
        <div className="account__search-bar">
          <input
            type="text"
            name={FIELDS.SEARCH}
            id="search"
            className="account__search-bar__input"
            placeholder="Search contacts"
            value={searchInput}
            onChange={e => handleSearchChange(e)}
          />
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

      {/* if there is anything in the search bar we display the
       filtered data instead of the user data */}
      {type === options.VIEWCONTACT && searchInput.length === 0 && searchResult.length === 0 ? (
        <ViewContact data={user.contactList} />
      ) : (
        <ViewContact data={searchResult} />
      )}
    </section>
  );
};

export default UserAccount;
