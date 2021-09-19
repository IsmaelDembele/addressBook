import TextField from "@material-ui/core/TextField";
import { useState } from "react";

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignUpInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(signUpInfo);
  };

  return (
    <div className="landing-page__sign-up">
      <form action="" method="#" className="landing-page__sign-up__form">
        <div className="landing-page__sign-up__text">Create and account</div>
        <div className="landing-page__sign-up__fname">
          <TextField
            id="sign-up-firstname"
            label="First Name"
            variant="outlined"
            size="small"
            name="firstname"
            type="text"
            value={signUpInfo.firstname}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__lname">
          <TextField
            id="sign-up-lastname"
            label=" Last Name"
            variant="outlined"
            size="small"
            name="lastname"
            type="text"
            value={signUpInfo.lastname}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__email">
          <TextField
            id="sign-up-email"
            label="Email"
            variant="outlined"
            size="small"
            name="email"
            type="email"
            value={signUpInfo.email}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__pwd">
          <TextField
            id="sign-up-password"
            label="Password"
            variant="outlined"
            size="small"
            name="password"
            type="password"
            value={signUpInfo.password}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__pwd">
          <TextField
            id="sign-up-passwordConfirm"
            label="Confirm Password"
            variant="outlined"
            size="small"
            name="passwordConfirm"
            type="password"
            value={signUpInfo.passwordConfirm}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__btn">
          <button type="submit" className="btn" onClick={e => handleClick(e)}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
