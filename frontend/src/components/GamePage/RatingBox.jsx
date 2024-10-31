import { useEffect, useState } from "react";

function RatingBox({ rating, setIsEditing, username, isMyRating }) {
  const [localRating, setLocalRating] = useState({});
  const [statusText, setStatusText] = useState(null);

  useEffect(() => {
    if (rating) {
      setLocalRating(rating);
      setStatusText(
        rating.Finished ? "finished" : rating.dnf ? "DNF" : null
      );
    }
  }, [rating]);


  return (
    <div className="d-flex flex-column mb-2 custom-comment-box-1">
      <div className="d-flex flex-row justify-content-between me-2">
        <p className="lead" style={{ fontWeight: "bold" }}>
          {isMyRating ? "my rating" : localRating?.User_Id}
        </p>
        {isMyRating ? (
          <span onClick={() => setIsEditing(true)} role="button">
            ✎
          </span>
        ) : null}
      </div>

      <div className="d-flex justify-content-between lead me-2 ms-2">
        <div className="d-flex justify-content-start">
          <p className="me-3">
            {isMyRating
              ? localRating.Rating
                ? `${localRating.Rating}★`
                : "you have not rated this game yet."
              : localRating.Rating}
          </p>
          <p>{localRating?.Comment || ""}</p>
        </div>
        <p className="d-flex justify-content-end">{statusText}</p>
      </div>
    </div>
  );
}

export default RatingBox;
