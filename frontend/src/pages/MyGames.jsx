import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";
import { userGames } from "../api/userGames";

function MyGames({ loginref, handlePageChange }) {
  const [games, setGames] = useState(new Map());
  const [selectedView, setSelectedView] = useState("allUserGames");

  const isInCategory = (gameId, category) =>
    games.get(category).some((g) => g.Id === gameId);

  const views = [
    "allUserGames",
    "ownedUserGames",
    "wishlistUserGames",
    "playedUserGames",
    "currentlyPlayingUserGames",
  ];

  useEffect(() => {
    async function fetchGames() {
      let myGames = new Map();

      for (let v of views) {
        myGames.set(v, await userGames(loginref.current, v));
      }
      console.log(myGames);
      setGames(myGames);
    }
    fetchGames();
  }, []);

  return (
    <div className="p-2 container">
      <h2
        className="display-3 text-center"
        style={{ color: "HSL(0, 0%, 80%)", fontWeight: "bold" }}
      >
        My games
      </h2>
      <div className="d-flex justify-content-end">
        <select
          className="form-select form-select-sm customDropDown"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
        >
          <option value="allUserGames">All My Games</option>
          <option value="ownedUserGames">Owned Games</option>
          <option value="wishlistUserGames">Wishlist</option>
          <option value="playedUserGames">Played Games</option>
          <option value="currentlyPlayingUserGames">Currently Playing</option>
        </select>
      </div>

      <div className="row justify-content-center">
        {Array.isArray(games.get(selectedView)) ? (
          games
            .get(selectedView)
            .map((game) => (
              <GameCard
                key={game.Id}
                id= {game.Id}
                title={game.Title}
                developer={game.Developer}
                publisher={game.Publisher}
                releaseDate={game.ReleaseDate}
                genres={game.Genres}
                imgPath={game.ImgPath}
                ownedGame={isInCategory(game.Id, "ownedUserGames")}
                wishlistGame={isInCategory(game.Id, "wishlistUserGames")}
                playedGame={isInCategory(game.Id, "playedUserGames")}
                currentlyPlayingGame={isInCategory(
                  game.Id,
                  "currentlyPlayingUserGames"
                )}
              />
            ))
        ) : (
          <div
            className="d-flex justify-content-center m-3"
            style={{ color: "white" }}
          >
            {games.get(selectedView)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGames;
