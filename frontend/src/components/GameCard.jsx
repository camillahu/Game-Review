import { useEffect, useState, useMemo } from "react";

function GameCard({game:{Title, Genres, ImgPath}, statusArray}) {
  const localGameStatus = useMemo(() => statusArray? statusArray : [], [statusArray]);
  const [gameStatus1, setGameStatus1] = useState();
  const [gameStatus2, setGameStatus2] = useState();

  useEffect(()=> {
  
    function handleStatus() {
      if (localGameStatus.includes("Owned")) {
        setGameStatus1({text : "owned", color: "HSL(120, 50%, 70%)"});
      }
      else if (localGameStatus.includes("Wishlist")) {
        setGameStatus1({text : "wishlist", color: "HSL(30, 70%, 70%)"});
      }
      else {
        setGameStatus1("");
      }
      if (localGameStatus.includes("Played")) {
        setGameStatus2({text : "played", color: "HSL(200, 60%, 65%)"});
      }
      else if (localGameStatus.includes("Currently Playing")) {
        setGameStatus2({text : "currently playing", color: "HSL(280, 50%, 70%)"});
      }
      else {
        setGameStatus2("");
      }
    }
    handleStatus();
  }, [localGameStatus])


  return (
    <>
      <div
        className="card p-3 m-4"
        style={{
          width: "20rem",
          height: "30rem",
          backgroundColor: "HSL(210, 15%, 25%)",
        }}
      >
        <div className="square-box mb-3">
          <img
            className="img-fluid img-cover"
            src={ImgPath}
            alt="game img"
          />
        </div>

        <div>
          <p
            className="h5 d-inline-block text-truncate"
            style={{ color: "HSL(0, 0%, 80%)" }}
          >
            {Title}
          </p>
          <p
            className="format-genre-text"
            style={{ color: "HSL(0, 0%, 80%)", fontSize: "0.85rem" }}
          >
            {Genres}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 mt-auto">
          <div style={{ color: "HSL(0, 0%, 80%)", fontSize: "0.80rem" }}>
            <div style= {{color: gameStatus1?.color}}>{gameStatus1?.text}</div>
            <div style= {{color: gameStatus2?.color}}>{gameStatus2?.text}</div>
          </div>
          <div>
            <button className="btn btn-outline-light">
              View details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameCard;
