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
    //getting the result of fetchGames in App, and setting the local state.
    //this prevents having to fetch every time a component changes.
    setLocalGames(allGamesResult);
  }, [allGamesResult]);

  useEffect(() => {
    //getting the result of fetchGenres in App, and setting the local state.
    //this prevents having to fetch every time a component changes.
    setLocalGenres(allGenresResult);
  }, [allGenresResult]);

  useEffect(() => {
    //getting the result of fetchGameStatus in App, and setting the local state.
    //this prevents having to fetch every time a component changes.
    //this will only set if gamesByStatus has a value, if not, it will set an empty array. 
    //if the user is not logged in, the state in app wont be set.
    setLocalGamesByStatus(gamesByStatus ?? []);
  }, [gamesByStatus]);


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

  function getStatus(id) {
    //this function is used to return a filtered array to each game in the map of gameCards.
    //the array contains the respective game's status, if any ("owned", "wishlist", "played" or "currently playing")
    if(localGamesByStatus) {
       const filtered = localGamesByStatus.filter(status => status.GameId === id);
       if(filtered) {
        return filtered.map(r => r.Name);
       }
       else {
        return [];
       }
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
            statusArray= {getStatus(game.Id) ?? []}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
