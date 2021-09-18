// import React from "react";
import TextField from "@material-ui/core/TextField";

const SignUp = () => {
  return (
    <div className="landing-page__sign-up">
      <form action="" method="#" className="landing-page__sign-up__form">
        <div className="landing-page__sign-up__text">Create and account</div>
        <div className="landing-page__sign-up__fname">
          <TextField id="outlined-basic" label="First Name" variant="outlined" size="small" />
        </div>
        <div className="landing-page__sign-up__lname">
          <TextField id="outlined-basic" label=" Last Name" variant="outlined" size="small" />
        </div>
        <div className="landing-page__sign-up__email">
          <TextField id="outlined-basic" label="Email" variant="outlined" size="small" />
        </div>
        <div className="landing-page__sign-up__pwd">
          <TextField id="outlined-basic" label="Password" variant="outlined" size="small" />
        </div>
        <div className="landing-page__sign-up__pwd">
          <TextField id="outlined-basic" label="Confirm Password" variant="outlined" size="small" />
        </div>
        <div className="landing-page__sign-up__btn">
          <button type="submit" className="btn">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
