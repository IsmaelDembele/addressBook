import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

// import "./header.scss";

const Header = () => {
  return (
    <nav className="nav">
      <Link to="/" className="nav__logo">
        <div >
          <img src={logo} alt="" />
        </div>
      </Link>
      {/* <div className="nav__search-bar">
        <input type="text" name="" id="" className="nav__search-bar__input" />
        <SearchRoundedIcon className="nav__search-bar__button" />
      </div> */}
      <Link to="account" className="nav__account">
        <div>My Account</div>
      </Link>
      <div className="nav__sign-up">sign out</div>
    </nav>
  );
};

export default Header;
