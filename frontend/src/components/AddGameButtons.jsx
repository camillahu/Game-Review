import { memo } from "react";

const AddGameButtons = memo(function AddGameButtons({
  isOwned,
  isWishlist,
  isPlayed,
  isCurrentlyPlaying,
}) {
  return (
    <div className="d-flex justify-content-between">
      <span
        role="button"
        className="me-3"
        style={{ color: isOwned ? `HSL(120, 50%, 70%)`: "HSL(0, 0%, 80%)" }}
      >
        Owned
        {isOwned && (
          <i
            className="bi bi-check-circle-fill ms-1"
            style={{ fontSize: "0.8em" }}
          ></i>
        )}
      </span>
      <span
        role="button"
        className="me-3"
        style={{ color: isWishlist? `HSL(30, 70%, 70%)` :  "HSL(0, 0%, 80%)"}}
      >
        Wishlist
        {isWishlist && (
          <i
            className="bi bi-check-circle-fill ms-1"
            style={{ fontSize: "0.8em" }}
          ></i>
        )}
      </span>
      <span role="button" className="me-3" style={{ color: isPlayed? `HSL(200, 60%, 65%)`: "HSL(0, 0%, 80%)" }}>
        Played
        {isPlayed && (
          <i
            className="bi bi-check-circle-fill ms-1"
            style={{ fontSize: "0.8em" }}
          ></i>
        )}
      </span>
      <span role="button" style={{ color: isCurrentlyPlaying? "HSL(280, 50%, 70%)": "HSL(0, 0%, 80%)" }}>
        Currently Playing
        {isCurrentlyPlaying && (
          <i
            className="bi bi-check-circle-fill ms-1"
            style={{ fontSize: "0.8em" }}
          ></i>
        )}
      </span>
    </div>
  );
});

export default AddGameButtons;
