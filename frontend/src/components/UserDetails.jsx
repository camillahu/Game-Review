import { useContext, useState, useEffect } from "react";
import { contextStuff } from "../App";
import { userDetails } from "../api/userDetails.js";

export default function UserDetails() {
  const { loginref, gameref, handlePageChange } = useContext(contextStuff);

  const [userInfo, setUserInfo] = useState({})
    
  useEffect(() => {
      async function fetchDetails() {
        const result = await userDetails(loginref.current)
         setUserInfo(result)
      }
      fetchDetails();
      
    }, [loginref]);
    console.log(userInfo)

  return (
    <div className="container justify-content-center custom-game-page-container">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-3 pe-3 p-1 border-bottom border-secondary">
        <h2
          className="display-5"
          style={{ color: "HSL(30, 20%, 85%)", fontWeight: 500 }}
        >
          {loginref.current}
        </h2>
      </div>
      <div className="d-flex flex-column m-4">
        <div className="d-flex justify-content-between align-items-center mb-2 ">
          <div className="d-flex justify-content-center flex-column">
            <div className="square-box-4">
              <img
                className="img-fluid img-cover"
                src={userInfo.ImgPath}
                alt="game img"
              />
            </div>
            <p className="lead">
              <strong>Bio:</strong>
              {userInfo.Bio}
            </p>
          </div>
          <div className="d-flex justify-content-start square-box-3 flex-column">
            <p className="lead">
              <strong> Games owned: </strong>
              number
            </p>
            <p className="lead">
              <strong> Games played: </strong>
              number
            </p>
            <p className="lead" style={{ marginTop: "auto" }}><strong > Favorite game: </strong></p>
            <div className="square-box-5">
              <img
                className="img-fluid img-cover"
                src="/img/HZD.png"
                alt="game img"
              />
            </div>
          </div>
        </div>
        <div>
          <h3
            className="display-6 mt-2"
            style={{ color: "HSL(30, 20%, 85%)" }}
          >Stats</h3>
          <div className="d-flex flex-column ">
            all stats here
          </div>
        </div>
      </div>
    </div>
  );
}
