// import React from "react";
import TextField from "@material-ui/core/TextField";

const SignIn = () => {
  return (
    <div className="landing-page__sign-in">
      <form action="" method="#" className="landing-page__sign-in__form">
        <div className="landing-page__sign-in__text">Log In to Your Account</div>
        <div className="landing-page__sign-in__email">
          <TextField id="outlined-basic" label="Email" variant="outlined" size="small" />
        </div>
        <div className="landing-page__sign-in__pwd">
          <TextField id="outlined-basic" label="Password" variant="outlined" size="small" />
        </div>
        <div className="landing-page__sign-in__btn">
          <button type="submit" className="btn">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
