function GameCard(props) {
  return (
    <>
      <div
        className="card p-3 col-md-3 m-4"
        style={{
          width: "20rem",
          height: "30rem",
          backgroundColor: "HSL(210, 15%, 25%)",
        }}
      >
        <div className="square-box mb-3">
          <img
            className="img-fluid img-cover"
            src={props.imgPath}
            alt="game img"
          />
        </div>

        <div>
          <p
            className="h5 d-inline-block text-truncate"
            style={{ color: "HSL(0, 0%, 80%)" }}
          >
            {props.title}
          </p>
          <p className="format-genre-text" style={{ color: "HSL(0, 0%, 80%)", fontSize: '0.85rem' }}>
            {props.genres}
          </p>
        </div>
        <div className="d-flex justify-content-end ">
          <button className="btn btn-outline-light position-absolute bottom-0 mb-4">
            View details
          </button>
        </div>
      </div>
    </>
  );
}

export default GameCard;
