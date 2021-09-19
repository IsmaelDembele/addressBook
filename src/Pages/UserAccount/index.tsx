import React, { useState } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddContact from "./AddContact";
import ViewContact from "./ViewContact/index";
// import {data} from './data';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";



const UserAccount = () => {
  const [type, setType] = useState<String>("addContact");

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.userData.contactList);



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

      {type === "addContact" && <AddContact />}

      {type === "contactList" && <ViewContact data={data} />}
    </section>
  );
};

export default UserAccount;
