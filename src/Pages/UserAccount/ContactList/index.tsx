import React from "react";
import { IContact } from "../data";
import Contact from "./Contact";

type Data = {
  data: IContact[];
}

const ContactList: React.FC<Data> = props => {
  const {data} = props;

  // console.log(data.data);
  

  return (
    <div className="account__user-list">
       {data.map((contact,index) => {
        return <Contact key={index} {...contact} />;
      })} 
      
    </div>
  );
};

export default ContactList;
