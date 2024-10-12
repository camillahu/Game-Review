import {useState, useEffect} from 'react'

function EditRatingBox({
  rating,
  comment,
  isFinished,
  isDNF,
  handleEditingStatus,
  updateMyRating,
  setRating,
  setComment,
  setFinishedStatus
}) {
  const ratingValues = [1, 2, 3, 4, 5];

  const [localFinished, setLocalFinished] = useState(isFinished);
  const [localDNF, setLocalDNF] = useState(isDNF);

  useEffect(()=> {
    setLocalFinished(isFinished)
    setLocalDNF(isDNF);
  }, [isFinished, isDNF])

  const handleCheckboxChange = (status) => {
    if (status ===  "Finished") {
      setLocalFinished(true);
      setLocalDNF(false);
    }
    else if (status ===  "dnf") {
      setLocalFinished(false);
      setLocalDNF(true);
    }
  }

  const handleSave = () => {
    console.log("f :" + localFinished, "d: " + localDNF)
    setFinishedStatus({
      finished: localFinished,
      dnf: localDNF,
    });
    
    updateMyRating();
    handleEditingStatus();
  }

  
  return (
    <div className="d-flex flex-column mb-2 custom-comment-box-2">
      <div className="d-flex flex-row justify-content-between me-2">
        <p className="lead" style={{ fontWeight: "bold" }}>
          my rating:
        </p>
        <button
          className="btn btn-outline-dark "
          type="submit"
          onClick={handleSave}
        >
          save
        </button>
      </div>

      <div className="d-flex justify-content-start lead m-2">
        <div>
          <label className="input-group-text" htmlFor="ratingSelect">
            Rating:
            <select
              className="custom-select ms-2"
              value={rating || "no rating"}
              onChange={(e) => setRating(e.target.value)}
            >
              {ratingValues.map((v, i) => (
                <option key={i + 1} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>

        <input
          className="form-control ms-3"
          type="text"
          value={comment || ""}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="d-flex flex-column ms-3">
          <div className="d-flex flex-row">
            <input
              value="finished"
              type="checkbox"
              checked={localFinished === true}
              onChange={(e) => handleCheckboxChange("Finished")}
            />
            <span className="ms-1" style={{ fontSize: "70%" }}>
              finished
            </span>
          </div>
          <div className="d-flex flex-row">
            <input
              value="dnf"
              type="checkbox"
              checked={localDNF === true}
              onChange={(e) => handleCheckboxChange("dnf")}
            />
            <span className="ms-1" style={{ fontSize: "70%" }}>
              DNF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRatingBox;
