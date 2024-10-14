import { useContext, useState, useEffect } from "react";
import { contextStuff } from "../App";
import { userDetails } from "../api/userDetails.js";
import { userGames } from "../api/userGames.js";

export default function UserDetails() {
  const { loginref, gameref, handlePageChange } = useContext(contextStuff);

  const [userInfo, setUserInfo] = useState({});
  const [allGames, setAllGames] = useState(new Map());

  const gamesOwnedNum = allGames.get("ownedUserGames")?.length || 0;
  const gamesPlayedNum = allGames.get("playedUserGames")?.length || 0;

  function viewFavoriteGame() {
    if(userInfo.FavoriteGame_Id){
      gameref.current = userInfo.FavoriteGame_Id;
    handlePageChange("gamePage");
    }
  }
  

  useEffect(() => {
    async function fetchDetails() {
      const result = await userDetails(loginref.current);
      setUserInfo(result);
        if(!result.Bio) {
          setUserInfo ((b) => ({ ...b, Bio: "No bio yet" }))
        }
        if(!result.Age) {
          setUserInfo ((a) => ({ ...a, Age: "not specified" }))
        }
        if(!result.Country) {
          setUserInfo ((c) => ({ ...c, Country: "not specified" }))
        } //denne funker ikke helt

      const categories = [
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
              <div className="square-box-4 " style= {{border: "5px, solid, HSL(45, 70%, 50%)"}}>
                <img
                  className="img-fluid img-cover"
                  src={userInfo.ProfilePic}
                  alt="profile img"
                />
              </div>
              <div className="lead ps-3" style={{ color: "HSL(30, 20%, 85%)", padding: "10px"}}>
                <p><strong>Age:  </strong>
                  {new Date(userInfo.Birthday).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p><strong>Country: </strong>{userInfo.Country}</p>
              </div>
            </div>

            <p className="lead custom-bio-box">
              <strong>Bio:</strong> <br />
              {userInfo.Bio}
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
            <div className="square-box-4" style= {{border: "5px, solid, HSL(340, 20%, 50%)"}}>
              <img
                className="img-fluid img-cover"
                src={userInfo.FaveGamePic || "img/default.png"}
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
          <div className="d-flex flex-column ">all stats here</div>
        </div>
      </div>
    </div>
  );
}
