import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "../../features/connectionSlice";
import { connectedUser } from "../../features/userDataSlice";
import { RootState } from "../../app/store";
import { useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import {
  entryCheck,
  verifyAllEntry,
  LOCAL_STORAGE_VARIABLE,
  PASSWORD_LENGTH,
  PATH,
  ISignInInfo,
  IError,
  ERROR_INITIAL_VALUE,
  FIELDS,
} from "../../helper/helper";

const LOGIN_QUERY = gql`
  query Query($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const VERIFY_TOKEN_QUERY = gql`
  query Query($token: String!, $useremail: String!) {
    verifyToken(token: $token, useremail: $useremail)
  }
`;

const SIGNIN_INITIAL_VALUE = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState<ISignInInfo>(SIGNIN_INITIAL_VALUE);
  const [myError, setMyError] = useState<IError>(ERROR_INITIAL_VALUE);
  const saveToken = localStorage.getItem(LOCAL_STORAGE_VARIABLE.tokenKey) || "";
  const saveEmail = localStorage.getItem(LOCAL_STORAGE_VARIABLE.emailKey) || "";

  const { data: verify_data, refetch: verifyRefetch } = useQuery(VERIFY_TOKEN_QUERY, {
    variables: { token: saveToken, useremail: saveEmail },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const { loading, data, refetch } = useQuery(LOGIN_QUERY, {
    variables: { email: loginInfo.email, password: loginInfo.password },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.connection.value);

  useEffect(() => {
    if (isConnected) {
      history.push(PATH.ACCOUNT);
    } else {
      verifyRefetch({
        token: saveToken,
        useremail: saveEmail,
      });
    }
  }, [isConnected, history, saveEmail, saveToken, verifyRefetch]);

  useEffect(() => {
    if (saveEmail && saveToken && verify_data) {
      if (verify_data.verifyToken === true) {
        const _login = {
          connected: true,
          token: saveToken,
        };
        dispatch(logInUser(_login));
        dispatch(connectedUser(saveEmail));
        history.push(PATH.ACCOUNT);
      }
    }
  }, [verify_data, dispatch, history, saveToken, saveEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { value, name } = e.target;
    let test = true;

    setLoginInfo(prev => ({ ...prev, [name]: value }));

    if (name === FIELDS.EMAIL) {
      test = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || value === "";
    }
    if (name === FIELDS.PASSWORD) {
      test = value.length >= PASSWORD_LENGTH || value === "";
    }
    entryCheck(setMyError, name, test);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (verifyAllEntry(loginInfo, myError, setMyError)) {
      return;
    }

    refetch({
      email: loginInfo.email,
      password: loginInfo.password,
    });

    const token: string = data?.login || "";
    const connected = token.length > 0;

    if (connected) {
      // save login information
      localStorage.setItem(LOCAL_STORAGE_VARIABLE.emailKey, loginInfo.email);
      localStorage.setItem(LOCAL_STORAGE_VARIABLE.tokenKey, token);
      //connect the user
      dispatch(logInUser({ connected, token }));
      dispatch(connectedUser(loginInfo.email));
    } else {
      alert("invalid email/password!!!");
    }

    setLoginInfo(SIGNIN_INITIAL_VALUE);
  };

  return (
    <div className="landing-page__sign-in">
      {loading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      <form action="" method="#" className="landing-page__sign-in__form">
        <div className="landing-page__sign-in__text">Sign in</div>
        <div className="landing-page__sign-in__email">
          <TextField
            id="email"
            label="Email"
            name={FIELDS.EMAIL}
            variant="outlined"
            size="small"
            type="email"
            value={loginInfo.email}
            error={myError.email}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-in__pwd">
          <TextField
            id="password"
            name={FIELDS.PASSWORD}
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={loginInfo.password}
            error={myError.password}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="landing-page__sign-in__btn">
          <button type="submit" className="btn" onClick={e => handleClick(e)}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
