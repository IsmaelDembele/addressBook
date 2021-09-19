import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { logOutUser } from "../../features/connectionSlice";
import { connectedUser } from "../../features/userDataSlice";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.connection.value);

  const handleSignOut = () => {
    dispatch(logOutUser());
    dispatch(connectedUser(""));
    history.push("/");
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav__logo">
        <div>
          <img src={logo} alt="" />
        </div>
      </Link>

      {/* {isConnected && (
        <Link to="account" className="nav__account">
          <div>My Account</div>
        </Link>
      )} */}

      {isConnected && (
        <div className="nav__sign-up" onClick={() => handleSignOut()}>
          sign out
        </div>
      )}
    </nav>
  );
};

export default Header;
