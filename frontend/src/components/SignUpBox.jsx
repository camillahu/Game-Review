import React, { useState } from "react";
import { signup } from "../api/signupAuth.js";
import { checkPassword, checkUsername } from "../utils/formControl.js";
import { Link, useNavigate } from "react-router-dom";

function SignUpBox({ setErrorMsg, loginref }) {
  // const [passwordVisible, setPasswordVisible] = useState(false);
  // const [formData, setFormData] = useState({ username: "", password1: "", password2: "" });
  // const navigate = useNavigate();

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const sendInput = (e) => {
  //   e.preventDefault();
  //   const usernameResult = checkUsername(formData.username);
  //   const passwordResult = checkPassword(
  //     formData.password1,
  //     formData.password2
  //   );

  //   if (!inputName || !inputPassword1) {
  //     setErrorMsg("Please enter both username and password");
  //     return; //returnerer tidlig om dette skjer.
  //   }

  //   if (!validInputs) {
  //     setErrorMsg("Invalid username or password format");
  //     return;
  //   } else submitForm();
  // };

  //   async function submitForm() { //refaktorert funksjon for bedre error-handling.
  //     setErrorMsg1("");
  //     setErrorMsg2("");

  //     const usernameResult = checkUsername(inputName);
  //     if(usernameResult.error) {
  //       setErrorMsg1(usernameResult.error); //setter staten på en mer dynamisk måte.
  //       return;
  //     }

  //     const passwordResult = checkPassword(inputPassword1, inputPassword2);
  //     if(passwordResult.error) {
  //       setErrorMsg2(passwordResult.error);
  //       return;
  //     }

  //     try {
  //       const response = await signup(usernameResult.value, passwordResult.value);
  //       if (response.error) {
  //         setErrorMsg1(response.error);
  //       } else {
  //         setErrorMsg1("User created successfully. Please proceed to log in");
  //       }
  //     } catch (error) {
  //       setErrorMsg1("A server error occurred. Please try again later.");
  //       console.error(error);
  //     }
  //   }

  return (
    <></>
    //     <div className="container d-flex justify-content-center align-items-center min-vh-100">
    //       <div
    //         className="card"
    //         style={{
    //           width: "25rem",
    //           backgroundColor: "HSL(210, 15%, 25%)",
    //           border: "5px solid HSL(210, 15%, 50%)",
    //         }}
    //       >
    // //         <div className="card-body">
    // //           <h3
    //             className="card-title text-center mb-5 h3"
    //             style={{ color: "HSL(0, 0%, 80%)" }}
    //           >
    //             GameReview!
    //           </h3>
    //           <form>
    //             <div className="mb-5">
    //               <input
    //                 type="text"
    //                 className="form-control mb-2"
    //                 placeholder="username"
    //                 onChange={handleNameChange}
    //               />

    //               <input
    //                 type={passwordVisable ? "text" : "password"}
    //                 className="form-control mb-2"
    //                 placeholder="password"
    //                 onChange={handlePasswordChange1}
    //               />

    //               <input
    //                 type={passwordVisable ? "text" : "password"}
    //                 className="form-control mb-4"
    //                 placeholder="repeat password"
    //                 onChange={handlePasswordChange2}
    //               />
    //               <div className="d-flex justify-content-between mb-4">
    //                 <button
    //                   type="button"
    //                   onClick={togglePasswordVisability}
    //                   className="btn btn-outline-light btn-sm"
    //                 >
    //                   {passwordVisable ? "Hide password" : "Show Password"}
    //                 </button>

    //                 <button
    //                   type="button"
    //                   onClick={submitForm}
    //                   className="btn btn-outline-light btn-sm"
    //                 >
    //                   Sign up
    //                 </button>
    //               </div>
    //               <a
    //                 role="button"
    //                 className="card-link"
    //                 style={{ color: "HSL(0, 0%, 80%)" }}
    //                 onClick={() => handlePageChange("login")}
    //               >
    //                 Already have an account? Log in here!
    //               </a>
    //               <div>{errorMsg1}</div>
    //               <div>{errorMsg2}</div>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
  );
}

export default SignUpBox;
