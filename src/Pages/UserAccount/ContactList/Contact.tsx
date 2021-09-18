import React from "react";
import { IContact } from "../data";

const Contact:React.FC<IContact> = ({ firstname, lastname, email, phone, address, note}) => {

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
          <button className="btn">delete user</button>
          <button className="btn">edit user</button>
        </div>
      </div> 
  );
};

export default Contact;
