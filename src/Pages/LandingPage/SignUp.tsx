import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import validator from "validator";
import {
  emailCheck,
  passwordCheck,
  passwordConfirmCheck,
  firstnameCheck,
  lastnameCheck,
  entryCheck,
} from "../../helper/validator_fn";

import { gql, useMutation } from "@apollo/client";

const pwLength = 5;

const ADD_USER_MUTATION = gql`
  mutation Mutation($email: String!, $firstname: String!, $lastname: String!, $password: String!) {
    addUser(email: $email, firstname: $firstname, lastname: $lastname, password: $password)
  }
`;

export const signUpInfoInitialValue = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const errorInitialValue = {
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  passwordConfirm: false,
};

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState(signUpInfoInitialValue);
  const [myError, setMyError] = useState(errorInitialValue);

  const [addUser, { data, loading, error }] = useMutation(ADD_USER_MUTATION);

  useEffect(() => {
    console.log("signUp data useEffect", data);
    if (data?.addUser) {
      console.log("new user added");
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;

    setSignUpInfo(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === "firstname") {
      const test = value.length >= 2 || value === "";
      firstnameCheck(signUpInfo, setMyError, test);
    }

    if (name === "lastname") {
      const test = value.length >= 2 || value === "";
      lastnameCheck(signUpInfo, setMyError, test);
    }

    if (name === "email") {
      const test = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || value === "";
      emailCheck(setMyError, test);
    }

    if (name === "password") {
      const test = value.length >= pwLength || value === "";

      passwordCheck(setMyError, test);
    }
    if (name === "passwordConfirm") {
      const test = value === signUpInfo.password || value === "";
      passwordConfirmCheck(signUpInfo, setMyError, test);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (entryCheck(signUpInfo, setMyError)) {
      return;
    }

    addUser({
      variables: {
        email: signUpInfo.email,
        firstname: signUpInfo.firstname,
        lastname: signUpInfo.lastname,
        password: signUpInfo.password,
      },
    });

    if (error) {
      console.log("error", error);
    }
    // console.log("data", data);
    setSignUpInfo(signUpInfoInitialValue);
  };

  return (
    <div className="landing-page__sign-up">
      {loading && <div>loading... </div>}
      <form action="" method="#" className="landing-page__sign-up__form">
        <div className="landing-page__sign-up__text">Create account</div>
        <div className="landing-page__sign-up__fname">
          <TextField
            id="sign-up-firstname"
            label="First Name"
            variant="outlined"
            size="small"
            name="firstname"
            type="text"
            value={signUpInfo.firstname}
            error={myError.firstname}
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
            error={myError.lastname}
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
            error={myError.email}
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
            error={myError.password}
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
            error={myError.passwordConfirm}
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
