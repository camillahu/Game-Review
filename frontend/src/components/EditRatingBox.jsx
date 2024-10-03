function EditRatingBox({
  loggedInUser,
  username,
  rating,
  comment,
  handleEditingStatus,
  setRating,
  setComment,
}) {
  const ratingValues = [1, 2, 3, 4, 5];

  return (
    <div className="d-flex flex-column mb-2 custom-comment-box-2">
      <div className="d-flex flex-row justify-content-between me-2">
        <p className="lead" style={{ fontWeight: "bold" }}>
          my rating:
        </p>
        <button
          className="btn btn-outline-dark "
          type="submit"
          onClick={handleEditingStatus}
        >
          save
        </button>
      </div>

      <div className="d-flex justify-content-start lead me-2 ms-2">
        <p className="me-3 ">
          <label className="input-group-text" htmlFor="ratingSelect">
            Rating:
            <select
              className="custom-select ms-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {ratingValues.map((v, i) => (
                <option key={i + 1} value={v}>{v}</option>
              ))}
            </select>
          </label>
        </p>
        <p>{comment || ""}</p>
      </div>
    </div>
  );
}

export default EditRatingBox;
