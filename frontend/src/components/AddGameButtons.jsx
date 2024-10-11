import { memo } from "react";

const AddGameButtons = memo(function AddGameButtons({
  isOwned,
  isWishlist,
  isPlayed,
  isCurrentlyPlaying,
}) {
  return (
    <div className="d-flex justify-content-between custom-button-box ">
      <span role="button" style={{ color: "HSL(0, 0%, 80%)" }}>
        Add to:
      </span>
      <span
        role="button"
        style={{
          color: `HSL(120, 50%, 70%)`,
        }}
      >
        Owned
        {isOwned && (
          <i
            className="bi bi-check-circle-fill ms-1"
            style={{ fontSize: "0.8em" }}
          ></i>
        )}
      </span>
      <span role="button" style={{ color: `HSL(30, 70%, 70%)` }}>
        Wishlist
        {isWishlist && (
          <i
            className="bi bi-check-circle-fill ms-1"
            style={{ fontSize: "0.8em" }}
          ></i>
        )}
      </span>
      <span role="button" style={{ color: `HSL(200, 60%, 65%)` }}>
        Played
        {isPlayed && (
          <i
            className="bi bi-check-circle-fill ms-1"
            style={{ fontSize: "0.8em" }}
          ></i>
        )}
      </span>
      <span role="button" style={{ color: "HSL(280, 50%, 70%)" }}>
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
