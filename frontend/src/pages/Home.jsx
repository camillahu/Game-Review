import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";

function Home({allGamesResult, allGenresResult}) {
  const [localGames, setLocalGames] = useState([]);
  const [localGenres, setLocalGenres] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [localGamesByStatus, setLocalGamesByStatus] = useState([]);
  const [selectedView, setSelectedView] = useState("allGames");

  useEffect(() => { 
    //getting the result of fetchGames in App, and setting the local state.
    //this prevents having to fetch every time a component changes.
    setLocalGames(allGamesResult);
    console.log("render home page")
  }, [allGamesResult]);

  useEffect(() => {
    //getting the result of fetchGenres in App, and setting the local state.
    //this prevents having to fetch every time a component changes.
    setLocalGenres(allGenresResult);
  }, [allGenresResult]);


  useEffect(() => {
    //this one is used to filter the games for the select menu accoriding to their genres. 
    //if All Games is selected, home will show all games in the db. 
    //if something other than that is selected, the function will filter all the locally saved games,
    //by genre. The games genres is initially a string, but gets put in a temporary array to check with includes.
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
            game={game}
            statusArray= {game.Statuses}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
