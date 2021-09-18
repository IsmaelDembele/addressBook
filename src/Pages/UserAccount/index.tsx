import React, { useState } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddUser from "./AddUser";
import ContactList from "./ContactList/index";
import {data} from './data';

const UserAccount = () => {
  const [type, setType] = useState<String>("addContact");

  const handleAddContact = (): void => {
    setType("addContact");
  };

  const handleContactList = (): void => {
    setType("contactList");
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

      {type === "addContact" && <AddUser />}

      {type === "contactList" && <ContactList data={data} />}
    </section>
  );
};

export default UserAccount;
