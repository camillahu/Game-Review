import {useState, useEffect } from "react";
import Stats from "../components/Graphs.jsx";
import { Link } from "react-router-dom";

export default function Profile({loggedInUser, userInfo}) {


  const [localUserInfo, setLocalUserInfo] = useState({});

  useEffect(()=> {
    setLocalUserInfo(userInfo)
  }, [userInfo])



  

  return (
    <div className="container justify-content-center custom-game-page-container">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-3 pe-3 p-1 border-bottom border-secondary">
        <h2
          className="display-5"
          style={{ color: "HSL(30, 20%, 85%)", fontWeight: 500 }}
        >
          {loggedInUser}
        </h2>
      </div>
      <div className="d-flex flex-column m-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column justify-content-between square-box-5">
            <div className="d-flex flex-row">
              <div
                className="square-box-4 "
                style={{ border: "5px, solid, HSL(45, 70%, 50%)" }}
              >
                <img
                  className="img-fluid img-cover"
                  src={userInfo.ProfilePic ?? "/img/default.png"}
                  alt="profile img"
                />
              </div>
              <div
                className="lead ps-3"
                style={{ color: "HSL(30, 20%, 85%)", padding: "10px" }}
              >
                <p>
                  <strong>
                    Birthday:
                    <br />
                  </strong>
                  &nbsp;&nbsp;&nbsp;
                  {localUserInfo.Birthday ? new Date(userInfo.Birthday).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }) : 'Not specified'}
                </p>
                <p>
                  <strong>
                    Country:
                    <br />
                  </strong>
                  &nbsp;&nbsp;&nbsp;{localUserInfo.Country ?? 'Not specified'}
                </p>
              </div>
            </div>

            <p className="lead custom-bio-box">
              <strong>Bio:</strong> <br />
              {localUserInfo.Bio ?? "No bio yet"}
            </p>
          </div>
          <div className="d-flex justify-content-start square-box-3 flex-column">
            <p className="lead">
              <strong> Games owned: </strong>
              {localUserInfo.GamesOwned}
            </p>
            <p className="lead">
              <strong> Games played: </strong>
              {localUserInfo.GamesPlayed}
            </p>
            <p className="lead" style={{ marginTop: "auto" }}>
              <strong> Favorite game: </strong>
            </p>
            <div
              className="square-box-4"
              style={{ border: "5px, solid, HSL(340, 20%, 50%)" }}
            ><Link
            to={`/game-page/${localUserInfo.FavoriteGame_Id}`}
          >
            <img
                className="img-fluid img-cover"
                src={localUserInfo.FaveGamePic || "img/noFaveGame.webp"}
                alt="game img"
                // onClick={viewFavoriteGame}
              />
          </Link>
              
            </div>
          </div>
        </div>
        <div>
          <h3 className="display-6 mt-2" style={{ color: "HSL(30, 20%, 85%)" }}>
            Stats
          </h3>
          <div className="mt-4" style={{size: "50%"}}>
            <Stats pieData={localUserInfo.GenresForPie} barData={localUserInfo.RatingsForBar} />
          </div>
        </div>
      </div>
    </div>
  );
}
