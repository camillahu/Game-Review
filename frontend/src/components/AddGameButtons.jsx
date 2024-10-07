import { useState } from "react";

function AddGameButtons() {
  const [isOwned, setIsOwned] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

  return (
    <div className="d-flex justify-content-between m-2" style>
      <span>Add to: </span>
      <span style={{ color: "HSL(120, 20%, 70%)" }}>Owned</span>
      <span style={{ color: "HSL(30, 40%, 70%)" }}>Wishlist</span>
      <span style={{ color: "HSL(200, 30%, 65%)" }}>Played</span>
      <span style={{ color: "HSL(280, 20%, 70%)" }}>Currently Playing</span>
    </div>
  );
}

export default AddGameButtons;
