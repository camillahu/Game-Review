import React from "react";
import { useState, useEffect } from "react";

function Header({ loginref, handlePageChange }) {
  const [signinTxt, setSigninTxt] = useState("Sign in");

  function handleSignInStatus() {
    //hvis man er logget in vil loginref settes til null og man blir sendt til home. Hvis ikke, blir man sendt til login-siden.
    if (signinTxt == "Sign out") {
      loginref.current = null;
      handlePageChange("home");
    } else {
      handlePageChange("login");
    }
  }

  function options() {
    //hvis man er logget inn, får man to ekstra navpoints i header.
    if (!loginref.current) return null;
    return (
      <>
        <span
          role="button"
          className="navbar-brand display-3"
          onClick={() => handlePageChange("myGames")}
        >
          {loginref.current ? "My Games" : ""}
        </span>
        <span
          role="button"
          className="navbar-brand display-3"
          onClick={() => handlePageChange("profile")}
        >
          {loginref.current ? "Profile" : ""}
        </span>
      </>
    );
  }

  useEffect(() => {
    //endrer på teksten til sign in/sign out
    if (!loginref.current) {
      setSigninTxt("Sign in");
    } else {
      setSigninTxt("Sign out");
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
        {options()}
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
