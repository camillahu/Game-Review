import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../api/loginAuth.js";
import { useContext } from "react";
import { contextStuff } from "../App.jsx";
import {checkWhiteSpace} from "../utils/formControl.js" 




function LogInBox() {
  const [inputName, setInputName] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [passwordVisable, setPasswordVisability] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { loginref, handlePageChange } = useContext(contextStuff);

  function handleNameChange(event) {
    setInputName(event.target.value);
  }

  function handlePasswordChange(event) {
    setInputPassword(event.target.value);
  }

  function togglePasswordVisability() {
    setPasswordVisability(!passwordVisable);
  }

  async function submitForm() {

    if( inputName === undefined || inputPassword === undefined) {
      setErrorMsg("enter both username and password");
      return;
    }
    else if (checkWhiteSpace(inputName) || checkWhiteSpace(inputPassword)) {
      setErrorMsg("enter both username and password without whitespace");
      return;
    }

    try {
      const response = await login(inputName, inputPassword); //sender parametre til logInAuth sin login-funksjon
      if (response.error) {
        setErrorMsg("Invalid password or username");
      }
      else {
        loginref.current = inputName;
        handlePageChange("profile");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("A server error occurred. Please try again later.");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card"
        style={{
          width: "25rem",
          backgroundColor: "HSL(210, 15%, 25%)",
          border: "5px solid HSL(210, 15%, 50%)",
        }}
      >
        <div className="card-body">
          <h3
            className="card-title text-center mb-5 h3"
            style={{ color: "HSL(0, 0%, 80%)" }}
          >
            GameReview!
          </h3>
          <form>
            <div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="username"
                onChange={handleNameChange}
              />

              <input
                type={passwordVisable ? "text" : "password"}
                className="form-control mb-5"
                placeholder="password"
                onChange={handlePasswordChange}
              />
              <div className="d-flex justify-content-between mb-4">
                <button
                  type="button"
                  onClick={togglePasswordVisability}
                  className="btn btn-outline-light btn-sm"
                >
                  {passwordVisable ? "Hide password" : "Show Password"}
                </button>

                <button
                  type="button"
                  onClick={submitForm}
                  className="btn btn-outline-light btn-sm "
                >
                  Login
                </button>
              </div>
              <a
                role="button"
                className="card-link"
                style={{ color: "HSL(0, 0%, 80%)" }}
                onClick={() => handlePageChange("signup")}
              >
                Don't have an account? Sign up here!
              </a>
              <div>{errorMsg}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogInBox;
