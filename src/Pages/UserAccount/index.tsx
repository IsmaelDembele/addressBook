import { useEffect, useState } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddContact from "./AddContact";
import ViewContact from "./ViewContact/index";
// import {data} from './data';
import {  useSelector } from "react-redux";
import { RootState } from "../../app/store";
const options = {
  ADDCONTACT: "addContact",
  VIEWCONTACT: "viewContact",
};
const UserAccount = () => {
  const [type, setType] = useState<String>(options.VIEWCONTACT);

  // const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.userData.contactList);
  const edit = useSelector((state: RootState) => state.userData.editContact);

  useEffect(() => {
    if (edit.value) { 
      setType(options.ADDCONTACT);
    }
  }, [edit]);

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

      {type === options.VIEWCONTACT && <ViewContact data={data} />}
    </section>
  );
};

export default UserAccount;
