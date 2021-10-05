import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomizedDialogs from "../../Components/dialog";
import {
  entryCheck,
  verifyAllEntry,
  PASSWORD_LENGTH,
  ISignUpInfo,
  IError,
  ERROR_INITIAL_VALUE,
  NAME_LENGTH_MIN,
  FIELDS,
} from "../../helper/helper";
import { gql, useMutation } from "@apollo/client";

const ADD_USER_MUTATION = gql`
  mutation Mutation($email: String!, $firstname: String!, $lastname: String!, $password: String!) {
    addUser(email: $email, firstname: $firstname, lastname: $lastname, password: $password)
  }
`;

export const SIGNUP_INFO_INITIAL_VALUE = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const DIALOG_INITIAL_VALUE = { _open: false, success: false };

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState<ISignUpInfo>(SIGNUP_INFO_INITIAL_VALUE);
  const [myError, setMyError] = useState<IError>(ERROR_INITIAL_VALUE);
  const [dialog, setDialog] = useState(DIALOG_INITIAL_VALUE);

  const [addUser, { data, loading, error }] = useMutation(ADD_USER_MUTATION, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  useEffect(() => {
    data?.addUser && setDialog({ _open: true, success: true });
  }, [data, error]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    let test = true;

    setSignUpInfo(prev => ({ ...prev, [name]: value }));

    if (name === FIELDS.FIRSTNAME || name === FIELDS.LASTNAME) {
      test = value.length >= NAME_LENGTH_MIN || value === "";
    }

    if (name === FIELDS.EMAIL) {
      test = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || value === "";
    }

    if (name === FIELDS.PASSWORD) {
      test = value.length >= PASSWORD_LENGTH || value === "";
    }
    if (name === FIELDS.PASSWORD_CONFIRM) {
      test = value === signUpInfo.password || value === "";
    }
    entryCheck(setMyError, name, test);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (verifyAllEntry(signUpInfo, myError, setMyError)) {
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

    setSignUpInfo(SIGNUP_INFO_INITIAL_VALUE);
  };

  const closeDialog = () => {
    setDialog({ _open: false, success: true });
  };

  return (
    <div className="landing-page__sign-up">
      {loading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}

      {data && (
        <div onClick={() => closeDialog()}>
          <CustomizedDialogs {...dialog} />
        </div>
      )}

      <form action="" method="#" className="landing-page__sign-up__form">
        <div className="landing-page__sign-up__text">Create account</div>
        <div className="landing-page__sign-up__fname">
          <TextField
            id="sign-up-firstname"
            label="First Name"
            variant="outlined"
            size="small"
            name={FIELDS.FIRSTNAME}
            type="text"
            value={signUpInfo.firstname}
            error={myError.firstname}
            required
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__lname">
          <TextField
            id="sign-up-lastname"
            label=" Last Name"
            variant="outlined"
            size="small"
            name={FIELDS.LASTNAME}
            type="text"
            value={signUpInfo.lastname}
            error={myError.lastname}
            required
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__email">
          <TextField
            id="sign-up-email"
            label="Email"
            variant="outlined"
            size="small"
            name={FIELDS.EMAIL}
            type="email"
            value={signUpInfo.email}
            error={myError.email}
            required
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__pwd">
          <TextField
            id="sign-up-password"
            label="Password"
            variant="outlined"
            size="small"
            name={FIELDS.PASSWORD}
            type="password"
            value={signUpInfo.password}
            error={myError.password}
            required
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__pwd">
          <TextField
            id="sign-up-passwordConfirm"
            label="Confirm Password"
            variant="outlined"
            size="small"
            name={FIELDS.PASSWORD_CONFIRM}
            type="password"
            value={signUpInfo.passwordConfirm}
            error={myError.passwordConfirm}
            required
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-up__btn">
          <button type="submit" className="btn" onClick={e => handleClick(e)}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
