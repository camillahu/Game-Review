function EditRatingBox({
  rating,
  comment,
  handleEditingStatus,
  updateMyRating,
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
          onClick={() => {
            updateMyRating(), handleEditingStatus();
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
          value={comment || ''}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  );
}

export default EditRatingBox;
