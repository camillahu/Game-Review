import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { signup } from "../api/signupAuth.js";
import { useContext } from "react";
import { contextStuff } from "../App.jsx";

function SignUpBox() {
  const [inputName, setInputName] = useState();
  const [inputPassword1, setInputPassword1] = useState();
  const [inputPassword2, setInputPassword2] = useState();
  const [passwordVisable, setPasswordVisability] = useState(false);

  const [errorMsg1, setErrorMsg1] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");

  const { loginref, handlePageChange } = useContext(contextStuff);

  function handleNameChange(event) {
    setInputName(event.target.value);
  }

  function handlePasswordChange1(event) {
    setInputPassword1(event.target.value);
  }

  function handlePasswordChange2(event) {
    setInputPassword2(event.target.value);
  }

  function togglePasswordVisability() {
    setPasswordVisability(!passwordVisable);
  }

  function checkPassword() {
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (inputPassword1 !== inputPassword2) {
      setErrorMsg2("Password doesn't match");
    } else if (!passwordRegEx.test(inputPassword1)) {
      setErrorMsg2(
        "Not a valid password. Password must contain at least one number, uppercase letter and lowercase letter, and at least 8 characters. "
      );
    } else {
      return inputPassword1;
      setErrorMsg1("");
      setErrorMsg2("");
    }
  }

  function checkUsername() {
    const usernameRegEx = /^[a-z0-9_\.]+$/;

    if (usernameRegEx.test(inputName)) {
      return inputName;
      setErrorMsg1("");
    } else {
      setErrorMsg1(
        "Not a valid username. Username can only contain lowercase letters, numbers, _ or ."
      );
    }
  }

  async function submitForm() {
    setErrorMsg1("");
    setErrorMsg2("");

    console.log("..." + loginref.current);

    if (!inputName || !inputPassword1) {
      setErrorMsg1("enter both username and password");
    }

    const userToSend = checkUsername();
    const passwordToSend = checkPassword();
    
    const response = await signup(userToSend, passwordToSend);
    
    console.log(response)

    if (response.status == 400) {
      setErrorMsg1("username already taken");
    } else {
      handlePageChange("login");
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
            <div className="mb-5">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="username"
                onChange={handleNameChange}
              />

              <input
                type={passwordVisable ? "text" : "password"}
                className="form-control mb-2"
                placeholder="password"
                onChange={handlePasswordChange1}
              />

              <input
                type={passwordVisable ? "text" : "password"}
                className="form-control mb-4"
                placeholder="repeat password"
                onChange={handlePasswordChange2}
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
                  className="btn btn-outline-light btn-sm"
                >
                  Sign up
                </button>
              </div>
              <a
                role="button"
                className="card-link"
                style={{ color: "HSL(0, 0%, 80%)" }}
                onClick={() => handlePageChange("login")}
              >
                Already have an account? Log in here!
              </a>
              <div>{errorMsg1}</div>
              <div>{errorMsg2}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpBox;
