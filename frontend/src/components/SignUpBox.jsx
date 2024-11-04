import React, { useState } from "react";
import { signup } from "../api/LoginSignupAuth.js";
import { checkPassword, checkUsername } from "../utils/formControl.js";
import { Link} from "react-router-dom";

function SignUpBox({ setErrorMsg }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendInput = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const usernameResult = checkUsername(formData.username);
    const passwordResult = checkPassword(
      formData.password1,
      formData.password2
    );

    if (!usernameResult || !passwordResult) {
      setErrorMsg("Please enter both username and password");
      return;
    } else if (usernameResult.error) {
      setErrorMsg(usernameResult.error);
      return;
    } else if (passwordResult.error) {
      setErrorMsg(passwordResult.error);
      return;
    } else submitForm(usernameResult.value, passwordResult.value);
  };

  async function submitForm(username, password) {
    try {
      const response = await signup(username, password);
      if (response.error) {
        setErrorMsg(response.error);
      } else {
        setErrorMsg("User created successfully. Please proceed to log in");
      }
    } catch (error) {
      setErrorMsg("A server error occurred. Please try again later.");
      console.error(error);
    }
  }

  return (
    <form onSubmit={sendInput}>
      <div className="d-flex flex-column">
        <input
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="username"
          onChange={handleChange}
          value={formData.username}
        />

        <input
          name="password1"
          type={passwordVisible ? "text" : "password"}
          className="form-control mb-2"
          placeholder="password"
          onChange={handleChange}
          value={formData.password1}
        />

        <input
        name="password2"
          type={passwordVisible ? "text" : "password"}
          className="form-control mb-4"
          placeholder="repeat password"
          onChange={handleChange}
          value={formData.password2}
        />
        <div className="d-flex justify-content-between mb-4 ms-2 me-2">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="btn btn-outline-light btn-sm"
          >
            {passwordVisible ? "Hide password" : "Show Password"}
          </button>

          <button type="submit" className="btn btn-outline-light btn-sm ">
            Sign up
          </button>
        </div>
        <Link
          className="card-link"
          style={{ color: "HSL(0, 0%, 80%)" }}
          to={`/account/login`}
        >
          Already have an account? Log in here!
        </Link>
      </div>
    </form>
  );
}

export default SignUpBox;
