import { useState, useMemo, useEffect } from "react";
import Select from "react-select"; //npm install react-select

function EditFaveGame({setFaveGame, originalFaveGame, allGames}) {
  const [localGame, setLocalGame] = useState(null);


  useEffect(() => {
    if (originalFaveGame && allGames?.length > 0) {
      const selectedGame = allGames.find(
        (option) => option.label === originalFaveGame
      );
      setLocalGame(selectedGame || null);
    }
  }, [originalFaveGame, allGames]);


  const changeHandler = (selectedGame) => {
    setLocalGame(selectedGame);
    setFaveGame(selectedGame?.label || null);
  };

  return (
    <div
    className="d-flex flex-column mt-3" style={{ width: "20rem" }}
    >
      <span className="lead mb-1" style={{ color: "HSL(30, 20%, 85%)" }}>Favorite game:</span>
      <Select options={allGames} value={localGame} onChange={changeHandler} isClearable/>
    </div>
  );
}

export default EditFaveGame;
