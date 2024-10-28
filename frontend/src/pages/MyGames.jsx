import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";


function MyGames({statusNames, userGames}) {
  const [localGames, setLocalGames] = useState([]);
  const [localStatusNames, setLocalStatusNames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const [selectedView, setSelectedView] = useState("All Games");


    useEffect(() => { 
    //getting the result of fetchGames + fetchGameStatus in App, and setting the local state.
    //this only gets the games that the user has put a status on.
    setLocalGames(userGames);
  }, [userGames]);

  
  
  useEffect(() => {
    //this gets the status names ("owned", "played", "wishlist" or "currently playing") and Id from the db
    //and sets the local state. 
    setLocalStatusNames(statusNames ?? []);
  }, [statusNames]);

  useEffect(() => {
    
    if (selectedView === "All Games") {
      setFilteredGames(localGames);
    } else {
      const filtered = localGames.filter((game) => {
        game.Statuses.inclu
        
        return genresAsArray.includes(selectedView);
      });
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
          {localStatusNames.map((sn) => (
            <option key={sn.Id} value={sn.Name}>
              {" "}
              {sn.Name}
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
