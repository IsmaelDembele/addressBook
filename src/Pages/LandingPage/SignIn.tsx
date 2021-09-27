import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "../../features/connectionSlice";
import { connectedUser } from "../../features/userDataSlice";
import { RootState } from "../../app/store";

import { useHistory } from "react-router-dom";

import { emailCheck, passwordCheck } from "../../helper/validator_fn";

import { useQuery, gql } from "@apollo/client";

const errorInitialValue = {
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  passwordConfirm: false,
};

const pwLength = 5;

const LOGIN_QUERY = gql`
  query Query($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [myError, setMyError] = useState(errorInitialValue);
  const { loading, error, data, refetch } = useQuery(LOGIN_QUERY, {
    variables: { email: loginInfo.email, password: loginInfo.password },
  });

  const history = useHistory();

  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.connection.value);
  // const user = useSelector((state: RootState) => state.userData.email);

  useEffect(() => {
    console.log("is connected", isConnected);
    if (isConnected) history.push("/account");
  }, [isConnected, history]);

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
    console.log("data inside login", data);
    const token: string = data.login;
    const connected = token.length > 0;
    dispatch(logInUser({connected, token}));
    dispatch(connectedUser(loginInfo.email));
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
