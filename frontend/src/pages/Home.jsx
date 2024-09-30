import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";
import { gamesAndGenres } from "../api/gamesAndGenres";
import { login } from "../api/loginAuth";
import { userGames } from "../api/userGames";

function Home({ loginref, handlePageChange }) {
  const [games, setGames] = useState([]);
  const [gamesByCategory, setGamesByCategory] = useState(new Map());

  const isInCategory = (gameId, category) => {
    return gamesByCategory.has(category)
      ? gamesByCategory.get(category).some((g) => g.Id === gameId)
      : false;
  };

  const views = [
    "allUserGames",
    "ownedUserGames",
    "wishlistUserGames",
    "playedUserGames",
    "currentlyPlayingUserGames",
  ];

  useEffect(() => {
    async function fetchGames() {
      try {
        const allGamesResponse = await gamesAndGenres();
        setGames(allGamesResponse);

        if (loginref) {
          const gameMap = new Map();

          for (let v of views) {
            const userGamesResponse = await userGames(loginref.current, v);
            gameMap.set(v, userGamesResponse);
          }
          setGamesByCategory(gameMap);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
    fetchGames();
  }, [loginref]);

  return (
    <div className="p-2 container">
      <h2
        className="display-3 text-center"
        style={{ color: "HSL(0, 0%, 80%)", fontWeight: "bold" }}
      >
        All Games
      </h2>
      <div className="row justify-content-center">
        {games.map((game) => (
          <GameCard
            key={game.Id}
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
        ))}
      </div>
    </div>
  );
}

export default Home;
