import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";

function Home({allGamesResult, allGenresResult, gamesByStatus}) {
  const [localGames, setLocalGames] = useState([]);
  const [localGenres, setLocalGenres] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [localGamesByStatus, setLocalGamesByStatus] = useState([]);
  const [selectedView, setSelectedView] = useState("allGames");

  useEffect(() => {
    setLocalGames(allGamesResult);
  }, [allGamesResult]);

  useEffect(() => {
    setLocalGenres(allGenresResult);
  }, [allGenresResult]);

  useEffect(() => {
    setLocalGamesByStatus(gamesByStatus);
  }, [gamesByStatus]);


  useEffect(() => {
    if (selectedView === "allGames") {
      setFilteredGames(localGames);
    } else {
      const filtered = localGames.filter((game) => {
        const genresAsArray = game.Genres.split(",").map((g) => g.trim());
        return genresAsArray.includes(selectedView);
      });
      setFilteredGames(filtered);
    }
  }, [selectedView, localGames, localGenres]);

  function getStatus(id) {
    if(localGamesByStatus) {
       const filtered = localGamesByStatus.filter(status => status.GameId === id);
       const resultArray = filtered.map(r => r.Name);
       return resultArray;
    }
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
          {localGenres.map((lg) => (
            <option key={lg.Id} value={lg.Name}>
              {" "}
              {lg.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="row justify-content-center">
        {filteredGames.map((game) => (
          <GameCard
            key={game.Id}
            id={game.Id}
            title={game.Title}
            developer={game.Developer}
            publisher={game.Publisher}
            releaseDate={game.ReleaseDate}
            genres={game.Genres}
            imgPath={game.ImgPath}
            statusArray= {getStatus(game.Id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
