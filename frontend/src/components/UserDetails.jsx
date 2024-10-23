import { useContext, useState, useEffect } from "react";
import { contextStuff } from "../utils/pageChanger";
import { userDetails } from "../api/userDetails.js";
import { userGames } from "../api/userGames.js";
import PieChart from "./Graphs.jsx";

export default function UserDetails() {
  const { loginref, gameref, handlePageChange } = useContext(contextStuff);

  const [userInfo, setUserInfo] = useState({});
  const [allGames, setAllGames] = useState(new Map());

  const gamesOwnedNum = allGames.get("ownedUserGames")?.length || 0; //setter variablene til 0 dersom den er null
  const gamesPlayedNum = allGames.get("playedUserGames")?.length || 0;

  function viewFavoriteGame() {
    if (userInfo.FavoriteGame_Id) {
      gameref.current = userInfo.FavoriteGame_Id;
      handlePageChange("gamePage");
    }
  }

  useEffect(() => {
    async function fetchDetails() {
      const result = await userDetails(loginref.current);
      setUserInfo(result);
      console.log(result)

      const categories = [ //dette er kategoriene som blir satt inn i allgames Map. De samme kategoriene blir brukt til å sende riktig "view" til backenden i usergames. 
        "ownedUserGames",
        "wishlistUserGames",
        "playedUserGames",
        "currentlyPlayingUserGames",
      ];

      const dataForStats = categories.map((c) =>
        userGames(loginref.current, c)
      );
      const results = await Promise.all(dataForStats);

      const gameMap = new Map();
      categories.forEach((category, index) => {
        gameMap.set(category, results[index]);
      });

      setAllGames(gameMap);
    }
    fetchDetails();
  }, [loginref]);

  

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
                  {userInfo.Birthday ? new Date(userInfo.Birthday).toLocaleDateString("en-GB", {
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
                  &nbsp;&nbsp;&nbsp;{userInfo.Country ?? 'Not specified'}
                </p>
              </div>
            </div>

            <p className="lead custom-bio-box">
              <strong>Bio:</strong> <br />
              {userInfo.Bio ?? "No bio yet"}
            </p>
          </div>
          <div className="d-flex justify-content-start square-box-3 flex-column">
            <p className="lead">
              <strong> Games owned: </strong>
              {gamesOwnedNum}
            </p>
            <p className="lead">
              <strong> Games played: </strong>
              {gamesPlayedNum}
            </p>
            <p className="lead" style={{ marginTop: "auto" }}>
              <strong> Favorite game: </strong>
            </p>
            <div
              className="square-box-4"
              style={{ border: "5px, solid, HSL(340, 20%, 50%)" }}
            >
              <img
                className="img-fluid img-cover"
                src={userInfo.FaveGamePic || "img/noFaveGame.webp"}
                alt="game img"
                onClick={viewFavoriteGame}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="display-6 mt-2" style={{ color: "HSL(30, 20%, 85%)" }}>
            Stats
          </h3>
          <div className="mt-4" style={{size: "50%"}}>
            <PieChart username={loginref.current} />
          </div>
        </div>
      </div>
    </div>
  );
}
