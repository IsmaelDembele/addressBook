import React from "react";
import { IContact } from "../data";
import Contact from "./Contact";

type Data = {
  data: IContact[];
};

const ViewContact: React.FC<Data> = props => {
  const { data } = props;

  // console.log(data.data);

  return (
    <div className="account__user-list">
      {data?.map((contact, index) => {
        return <Contact key={index} contact={contact} index={index}  />;
      })}
    </div>
  );
};

export default ViewContact;
