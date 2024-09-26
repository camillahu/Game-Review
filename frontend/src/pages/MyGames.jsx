import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameCard from "../components/GameCard";
import { allUserGames, ownedUserGames, wishlistUserGames, playedUserGames, currentlyPlayingUserGames } from "../api/userGames";

function MyGames({ loginref, handlePageChange }) {
  const [games, setGames] = useState([]);
  const [selectedView, setSelectedView] = useState("all");

  function chooseView() {
    
    switch(selectedView){
        case "all":
            return allUserGames(loginref.current);
            break;
        case "owned":
            return ownedUserGames(loginref.current);
            break;
        case "wishlist":
            return wishlistUserGames(loginref.current);
            break;
        case "played":
            return playedUserGames(loginref.current);
            break;
        case "currently":
            return currentlyPlayingUserGames(loginref.current);
            break;
        default: console.log("not valid view");
    }
}

  useEffect(() => {
    console.log(selectedView);
    async function fetchGames() {
      try {
        const response = await chooseView();
        setGames(response);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
    fetchGames();
  }, [selectedView]);

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
          <option value="all">All My Games</option>
          <option value="owned">Owned Games</option>
          <option value="wishlist">Wishlist</option>
          <option value="played">Played Games</option>
          <option value="currently">Currently Playing</option>
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
          />
        ))}
      </div>
    </div>
  );
}

export default MyGames;
