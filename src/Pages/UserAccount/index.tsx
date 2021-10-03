import { useEffect, useState } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddContact from "./AddContact";
import ViewContact from "./ViewContact/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useQuery, gql } from "@apollo/client";
import { initContactList } from "../../features/userDataSlice";
import { IContact } from "../../helper/helper";
import CircularProgress from "@material-ui/core/CircularProgress";

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

  const { loading,/* error,*/ data, refetch } = useQuery(GET_CONTACTS_QUERY, {
    variables: { useremail: user.email },
  });

  const dispatch = useDispatch();

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchInput(value);

    const _data = user.contactList.filter(contact => {
      return (contact.firstname + " " + contact.lastname).toLocaleLowerCase().includes(value);
    });

    console.log(_data);
    setSearchResult(_data);

    console.log(name, value);
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
            name="search"
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

      {type === options.VIEWCONTACT && searchResult.length === 0 ? (
        <ViewContact data={user.contactList} />
      ) : (
        <ViewContact data={searchResult} />
      )}

      {/* {type === options.VIEWCONTACT && <ViewContact data={user.contactList} />} */}
    </section>
  );
};

export default UserAccount;
