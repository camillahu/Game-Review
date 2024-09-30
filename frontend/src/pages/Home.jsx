import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";
import { gamesAndGenres, genres } from "../api/gamesAndGenres";
import { login } from "../api/loginAuth";
import { userGames } from "../api/userGames";

function Home({ loginref, handlePageChange }) {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [gamesByCategory, setGamesByCategory] = useState(new Map());
  const [selectedView, setSelectedView] = useState("allGames");

  const isInCategory = (gameId, category) => {
    return gamesByCategory.has(category)
      ? gamesByCategory.get(category).some((g) => g.Id === gameId)
      : false;
  };

  const categories = [
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

          for (let c of categories) {
            const userGamesResponse = await userGames(loginref.current, c);
            gameMap.set(c, userGamesResponse);
          }
          setGamesByCategory(gameMap);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
    fetchGames();
  }, [loginref]);

  useEffect(() => {
    async function fetchGenres() {
        try {
            const response = await genres();
            setGenres(response);
        }
        catch (error) {
            console.error("Error fetching genres", error);
        }
    }
    fetchGenres();
  }, [])

  return (
    <div className="p-2 container">
      <h2
        className="display-3 text-center"
        style={{ color: "HSL(0, 0%, 80%)", fontWeight: "bold" }}
      >
        All Games
      </h2>
      <div className="d-flex justify-content-end">
        <select
          className="form-select form-select-sm customDropDown"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
        >
          <option value="allGames">All My Games</option>
          <option value="ownedUserGames">Owned Games</option>
          <option value="wishlistUserGames">Wishlist</option>
          <option value="playedUserGames">Played Games</option>
          <option value="currentlyPlayingUserGames">Currently Playing</option>
        </select>
      </div>
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
