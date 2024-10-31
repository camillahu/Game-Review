import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";


function MyGames({userGames}) {
  const [localGames, setLocalGames] = useState([]);
  const statusNames = ["Owned", "Wishlist", "Played", "Currently Playing"]
  const [filteredGames, setFilteredGames] = useState([]);

  const [selectedView, setSelectedView] = useState("All Games");

    useEffect(() => { 
    //getting the result of fetchGames + fetchGameStatus in App, and setting the local state.
    //this only gets the games that the user has put a status on.
    setLocalGames(userGames);
  }, [userGames]);

  useEffect(() => {
    if (selectedView === "All Games") {
      setFilteredGames(localGames);
    } else {
      const filtered = localGames.filter((game) => 
        game.Statuses.includes(selectedView)   
      );
      setFilteredGames(filtered);
    }
  }, [selectedView, localGames]);

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
          <option value="All Games">All My Games</option>
          {statusNames.map((name, index) => (
            <option key={index+1} value={name}>
              {" "}
              {name}
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

export default MyGames;
