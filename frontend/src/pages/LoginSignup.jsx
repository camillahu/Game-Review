import { useState } from "react";
import { useParams } from "react-router-dom";
import LogInBox from "../components/LogInBox.jsx";
import SignUpBox from "../components/SignUpBox.jsx";

export default function LoginSignup({loginref}) {
  const { choice } = useParams();
  
  const [errorMsg, setErrorMsg] = useState("");
  
  const toggleChoice = () => {
    return choice === "login" ? <LogInBox setErrorMsg= {setErrorMsg} loginref={loginref} /> : <SignUpBox setErrorMsg={setErrorMsg} />;
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="d-flex flex-column p-4"
          style={{
            width: "30rem",
            height: "30rem",
            backgroundColor: "HSL(210, 15%, 25%)",
            border: "5px solid HSL(210, 15%, 50%)",
          }}
        >
           <h3
              className="card-title text-center h3"
              style={{ color: "HSL(0, 0%, 80%)" }}
            >
              GameReview!
            </h3>
          <div className="card-body d-flex flex-column justify-content-center">
           
            <div>{toggleChoice()}</div>
          </div>
          <div className="font-monospace" style={{color: "HSL(1, 80%, 80%"}} >{errorMsg}</div>
        </div>
      </div>
    </div>
  );
}
