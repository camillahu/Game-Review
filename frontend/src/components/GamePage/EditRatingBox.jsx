import { useState, useEffect } from "react";

function EditRatingBox({ rating, setIsEditing, username }) {
  const ratingValues = [1, 2, 3, 4, 5];
  const [localRating, setLocalRating] = useState({});

  useEffect(() => {
    if (rating) {
      setLocalRating(rating);
    }
  }, [rating]);

  function updateLocal(property, value) {
    setLocalRating((prevRating) => ({
      ...prevRating,
      [property]: value,
    }));
  }

  function handleToggle(property) {
    setLocalRating((prevRating) => ({
      ...prevRating,
      Finished: property === "Finished",
      dnf: property === "dnf",
    }));
  }


  // function saveRating() {}

  return (
    <div className="d-flex flex-column mb-2 custom-comment-box-2">
      <div className="d-flex flex-row justify-content-between me-2">
        <p className="lead" style={{ fontWeight: "bold" }}>
          my rating:
        </p>
        <button
          className="btn btn-outline-dark "
          type="submit"
          onClick={() => {
            updateMyRating();
          }}
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
              value={localRating.Rating || "no rating"}
              onChange={(e) => updateLocal("Rating", e.target.value)}
            >
              <option key={0} value="no rating">
                no rating
              </option>
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
          value={localRating.Comment || ""}
          onChange={(e) => updateLocal("Comment", e.target.value)}
        />
        <div className="d-flex flex-column ms-3">
          <div className="d-flex flex-row">
            <input
              value="finished"
              type="checkbox"
              checked={localRating.Finished === true}
              onChange={() => handleToggle("Finished")}
            />
            <span className="ms-1" style={{ fontSize: "70%" }}>
              finished
            </span>
          </div>
          <div className="d-flex flex-row">
            <input
              value="dnf"
              type="checkbox"
              checked={localRating.dnf === true}
              onChange={() => handleToggle("dnf")}
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
