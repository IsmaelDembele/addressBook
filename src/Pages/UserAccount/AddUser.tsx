// import React from "react";
import TextField from '@material-ui/core/TextField';

const AddUser = () => {
  return (<div className="account__add-contact">
  <div className="account__add-title">Add the new contact information</div>
  <form action="#" className="account__form">
    <div className="account__add-fname">
      <TextField id="outlined-basic" label="Firt Name" variant="outlined" size="small" />
    </div>
    <div className="account__add-lname">
      <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small" />
    </div>
    <div className="account__add-email">
      <TextField id="outlined-basic" label="Email" variant="outlined" size="small" />
    </div>
    <div className="account__add-phone">
      <TextField id="outlined-basic" label="Phone number" variant="outlined" size="small" />
    </div>
    <div className="account__add-address">
      <TextField
        id="outlined-basic"
        label="Address"
        variant="outlined"
        size="small"
      />
    </div>
    <div className="account__add-note">
      <textarea rows={5} placeholder="Add note" />
    </div>
  <button className='btn'>
    Add
  </button>
  </form>
</div>);
  
};

export default AddUser;
