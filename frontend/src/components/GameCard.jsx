import { useContext } from "react";
import { contextStuff } from "../App";

function GameCard(props) {
  const { handlePageChange, gameref } = useContext(contextStuff);

  function gameStatus1() {
    if (props.ownedGame) {
      return <div style={{ color: "HSL(120, 50%, 70%)" }}>Owned</div>;
    } else if (props.wishlistGame) {
      return <div style={{ color: "HSL(30, 70%, 70%)" }}>Wishlist</div>;
    }
  }

  function gameStatus2() {
    if (props.playedGame) {
      return <div style={{ color: "HSL(200, 60%, 65%)" }}>Played</div>;
    } else if (props.currentlyPlayingGame) {
      return (
        <div style={{ color: "HSL(280, 50%, 70%)" }}>Currently Playing</div>
      );
    }
  }

  function viewGamePage() {
    gameref.current = props.id;
    handlePageChange("gamePage");
  }

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
            src={props.imgPath}
            alt="game img"
          />
        </div>

        <div>
          <p
            className="h5 d-inline-block text-truncate"
            style={{ color: "HSL(0, 0%, 80%)" }}
          >
            {props.title}
          </p>
          <p
            className="format-genre-text"
            style={{ color: "HSL(0, 0%, 80%)", fontSize: "0.85rem" }}
          >
            {props.genres}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 mt-auto">
          <div style={{ color: "HSL(0, 0%, 80%)", fontSize: "0.70rem" }}>
            {gameStatus1()}
            {gameStatus2()}
          </div>
          <div>
            <button className="btn btn-outline-light" onClick={viewGamePage}>
              View details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameCard;
