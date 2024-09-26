import React from "react";
import { useState, useEffect } from "react";

function Header({ loginref, handlePageChange }) {
  const [btnTxt, setBtnTxt] = useState("Sign in");

  function handleIsLoggedIn() {
    if (
      loginref.current == "" ||
      loginref.current == null ||
      loginref.current == undefined
    ) {
      setBtnTxt("Sign in");
    } else {
      setBtnTxt("Sign out");
    }
  }

  function handleSignInStatus() {
    if (btnTxt == "Sign out") {
      loginref.current = "";
      handlePageChange("home");
    } else {
      handlePageChange("login");
    }
  }

  useEffect(() => {
    handleIsLoggedIn();
  }, [loginref.current]);

  return (
    <nav className="navbar navbar-custom p-3">
      <div className="container justify-content-between">
        <span
          role="button"
          className="navbar-brand display-3"
          onClick={() => handlePageChange("home")}
        >
          GameReview!
        </span>
        <span
          role="button"
          className="navbar-brand display-3"
          onClick={handleSignInStatus}
        >
          {btnTxt}
        </span>
      </div>
    </nav>
  );
}

export default Header;
