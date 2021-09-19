import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "../../features/connectionSlice";
import { connectedUser } from "../../features/userDataSlice";
import { RootState } from "../../app/store";

import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "hi@hi.com", password: "12345" });
  const history = useHistory();

  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.connection.value);
  // const user = useSelector((state: RootState) => state.userData.email);

  useEffect(() => {
    console.log("is connected", isConnected);
    if (isConnected) history.push("/account");
  }, [isConnected,history]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { value, name } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    dispatch(logInUser(loginInfo));
    dispatch(connectedUser(loginInfo.email));
    setLoginInfo({ email: "", password: "" });
  };

  return (
    <div className="landing-page__sign-in">
      <form action="" method="#" className="landing-page__sign-in__form">
        <div className="landing-page__sign-in__text">Log In to Your Account</div>
        <div className="landing-page__sign-in__email">
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            size="small"
            type="email"
            value={loginInfo.email}
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
