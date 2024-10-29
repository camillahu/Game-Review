import { useEffect, useState } from "react";

function RatingBox({rating:{User_Id, Game_Id, Rating ,Comment, Finished, dnf}, setIsEditing, username}) {
  const [localRating, setLocalRating] = useState({});
  const [isMyRating, setIsMyRating] = useState(false);

  useEffect(() => {
    if (username && username === User_Id) {
      setIsMyRating(true);
    }
    setLocalRating(rating);
  }, [rating, username]);

  const finishedStatusText = () => {
    if (localRating.Finished) "finished";
    else if (localRating.dnf) "DNF";
    else  null;
  }

  return (
    <div className="d-flex flex-column mb-2 custom-comment-box-1">
      <div className="d-flex flex-row justify-content-between me-2">
        <p className="lead" style={{ fontWeight: "bold"}}>
        {isMyRating ? "my rating" : localRating.User_Id}
        </p>
        {isMyRating? <span onClick={()=>setIsEditing(true)} role="button">✎</span> : null}
      </div>

      <div className="d-flex justify-content-between lead me-2 ms-2">
        <div className="d-flex justify-content-start"><p className="me-3">
          {localRating.Rating ? localRating.Rating + "★" : "you have not rated this game yet."}
        </p>
        <p>{localRating.Comment || ""}</p></div>
        <p className="d-flex justify-content-end">{finishedStatusText()}</p>
      </div>
    </div>
  );
}

export default RatingBox;
