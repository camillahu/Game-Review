import React from "react";
import { useState, useEffect } from "react";

function Header({ loginref, handlePageChange }) {
  const [signinTxt, setSigninTxt] = useState("Sign in");
  const [profileTxt, setProfileTxt] = useState("");
 



  function handleSignInStatus() {
    if (signinTxt == "Sign out") {
      loginref.current = "";
      handlePageChange("home");
    } else {
      handlePageChange("login");
    }
  }

  useEffect(() => {
    if (
      loginref.current == "" ||
      loginref.current == null ||
      loginref.current == undefined
    ) {
      setSigninTxt("Sign in");
      setProfileTxt("")
    } else {
      setSigninTxt("Sign out");
      setProfileTxt("Profile")
    }
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
        <span role="button"
          className="navbar-brand display-3"
          onClick={() => handlePageChange("profile")}>{profileTxt}</span>
        <span
          role="button"
          className="navbar-brand display-3"
          onClick={handleSignInStatus}
        >
          {signinTxt}
        </span>
      </div>
    </nav>
  );
}

export default Header;
