import { useState } from "react";
import { useParams } from "react-router-dom";
import LogInBox from "../components/LogInBox.jsx";
import SignUpBox from "../components/SignUpBox.jsx";

export default function LoginSignup({loginref}) {
  const { choice } = useParams();
  
  const [errorMsg, setErrorMsg] = useState("");
  
  const toggleChoice = () => {
    return choice === "login" ? <LogInBox setErrorMsg= {setErrorMsg} /> : <SignUpBox setErrorMsg={setErrorMsg} />;
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card"
          style={{
            width: "30rem",
            height: "40rem",
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
            {toggleChoice()}
          </div>
          <div>{errorMsg}</div>
        </div>
      </div>
    </div>
  );
}
