import { useState, useMemo } from "react";
import Select from "react-select"; //npm install react-select

function EditFaveGame() {
  const [game, setGame] = useState("");
  const options = useState([]);

  return (
    <div
    className="d-flex flex-column mt-3" style={{ width: "20rem" }}
    >
      <span className="lead mb-1" style={{ color: "HSL(30, 20%, 85%)" }}>Favorite game:</span>
      <Select options={options} value={game} onChange={(e) => setGame(e.target.value)} style={{ margin: 0 }} />
    </div>
  );
}

export default EditFaveGame;
