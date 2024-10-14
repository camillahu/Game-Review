
function RatingBox({ loggedInUser, username, rating, comment, isFinished, isDNF, handleEditingStatus}) {
  
  const usernameView = () => {
    if (username === loggedInUser) return "my rating:";
    else if (username) return `${username}:`;
  };

  const editBtn = () => {
    if (username === loggedInUser) return <span onClick={handleEditingStatus} role="button">✎</span>;
    else return null;
  };

  const finishedStatusText = () => {
    if (isFinished) return "finished";
    else if (isDNF) return "DNF";
    else return "";
  }


  return (
    <div className="d-flex flex-column mb-2 custom-comment-box-1">
      <div className="d-flex flex-row justify-content-between me-2">
        <p className="lead" style={{ fontWeight: "bold"}}>
          {usernameView()}
        </p>
        {editBtn()}
      </div>

      <div className="d-flex justify-content-between lead me-2 ms-2">
        <div className="d-flex justify-content-start"><p className="me-3">
          {rating ? rating + "★" : "you have not rated this game yet."}
        </p>
        <p>{comment || ""}</p></div>
        <p className="d-flex justify-content-end">{finishedStatusText()}</p>
      </div>
    </div>
  );
}

export default RatingBox;
