import React, { useState } from "react";
import { login } from "../api/loginAuth.js";
import { checkWhiteSpace } from "../utils/formControl.js";
import { Link, useNavigate } from "react-router-dom";

function LogInBox({ setErrorMsg }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendInput = (e) => {
    e.preventDefault();
    const validInputs = checkWhiteSpace(formData.username) && checkWhiteSpace(formData.password);
    if (!validInputs) {
      setErrorMsg("Invalid username or password format")
      return;
    } else submitForm();
    console.log(formData);
  };

  async function submitForm() {
    try {
      const response = await login(formData.username, formData.password); //sender parametre til logInAuth sin login-funksjon
      if (response.error) {
        setErrorMsg("Invalid password or username");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("A server error occurred. Please try again later.");
    }
  }

  return (
    <form onSubmit={sendInput}>
      <div className="d-flex flex-column">
        <input
          name="username"
          type="text"
          placeholder="username"
          className="form-control mb-3"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          name="password"
          type={passwordVisible ? "text" : "password"}
          className="form-control mb-4"
          placeholder="password"
          onChange={handleChange}
          value={formData.password}
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
            Login
          </button>
        </div>
        <Link
            className="card-link"
            style={{ color: "HSL(0, 0%, 80%)" }}
            to={`/account/signup`}
          >
            Don't have an account? Sign up here!
          </Link>
      </div>
    </form>
  );
}

export default LogInBox;
