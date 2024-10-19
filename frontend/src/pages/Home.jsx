import React, { useState, useEffect,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";
import { gamesAndGenres, genres } from "../api/gamesAndGenres";
import { userGames } from "../api/userGames";
import { contextStuff } from "../App";

function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [gamesByCategory, setGamesByCategory] = useState(new Map());
  const [selectedView, setSelectedView] = useState("allGames");

  const { loginref } = useContext(contextStuff);

  const isInCategory = (gameId, category) => {
    const categoryGames = gamesByCategory.get(category) || []; //hvis gamesByCategory.get returnerer undefined, så setter vi inn et tomt array for å unngå error. 
    return categoryGames.some((g) => g.Id === gameId); //some vil returnere false dersom kategorien er et tomt array. 
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
        setAllGenres(response);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedView === "allGames") {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) => {
        const genresAsArray = game.Genres.split(",").map((g) => g.trim());
        return genresAsArray.includes(selectedView);
      });
      setFilteredGames(filtered);
    }
  }, [selectedView, games]);

  function genresLoop() {
    return allGenres.map((g) => (
      <option key={g.Id} value={g.Name}>
        {" "}
        {g.Name}
      </option>
    ));
  }

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
          <option value="allGames">All Games</option>
          {genresLoop()}
        </select>
      </div>
      <div className="row justify-content-center">
        {filteredGames.map((game) => (
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
        ))}
      </div>
    </div>
  );
}

export default Home;
