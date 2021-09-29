import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "../../features/connectionSlice";
import { connectedUser } from "../../features/userDataSlice";
import { RootState } from "../../app/store";

import { useHistory } from "react-router-dom";

import { emailCheck, passwordCheck,LOCAL_STORAGE_VARIABLE } from "../../helper/helper";

import { useQuery, gql } from "@apollo/client";

const errorInitialValue = {
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  passwordConfirm: false,
};

// const LOCAL_STORAGE_VARIABLE = {
//   tokenKey: "token",
//   emailKey: "email",
// };

const pwLength = 5;

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

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [myError, setMyError] = useState(errorInitialValue);
  const saveToken = localStorage.getItem(LOCAL_STORAGE_VARIABLE.tokenKey) || "";
  const saveEmail = localStorage.getItem(LOCAL_STORAGE_VARIABLE.emailKey) || "";

  const {
    loading: verify_loading,
    //error: verify_error,
    data: verify_data,
    refetch: verifyRefetch,
  } = useQuery(VERIFY_TOKEN_QUERY, {
    variables: { token: saveToken, useremail: saveEmail },
  });

  const { /*loading, error,*/ data, refetch } = useQuery(LOGIN_QUERY, {
    variables: { email: loginInfo.email, password: loginInfo.password },
  });

  const history = useHistory();

  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.connection.value);

  useEffect(() => {
    console.log("is connected", isConnected);
    if (isConnected) {
      history.push("/account");
    } else {
      verifyRefetch({
        token: saveToken,
        useremail: saveEmail,
      });
    }
  }, [isConnected, history]);

  useEffect(() => {
    console.log(verify_data, "------verifydata------");

    if (saveEmail && saveToken && verify_data) {
      if (verify_data.verifyToken === true) {
        const _login = {
          connected: true,
          token: saveToken,
        };
        dispatch(logInUser(_login));
        dispatch(connectedUser(saveEmail));
        history.push("/account");
      }
    }
  }, [verify_data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { value, name } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));

    if (name === "email") {
      const test = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || value === "";
      emailCheck(setMyError, test);
    }

    if (name === "password") {
      const test = value.length >= pwLength || value === "";
      passwordCheck(setMyError, test);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    refetch({
      email: loginInfo.email,
      password: loginInfo.password,
    });
    // console.log("data inside login", data);
    if (data) {
      const token: string = data?.login;
      const connected = token.length > 0;
      //saving the token to localStorage

      localStorage.setItem(LOCAL_STORAGE_VARIABLE.emailKey, loginInfo.email);
      localStorage.setItem(LOCAL_STORAGE_VARIABLE.tokenKey, token);
      dispatch(logInUser({ connected, token }));
      dispatch(connectedUser(loginInfo.email));
    }

    setLoginInfo({ email: "", password: "" });
  };

  return (
    <div className="landing-page__sign-in">
      <form action="" method="#" className="landing-page__sign-in__form">
        <div className="landing-page__sign-in__text">Sign in</div>
        <div className="landing-page__sign-in__email">
          <TextField
            id="email"
            label="Email"
            name="email"
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
            name="password"
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
