import { useState, useEffect, useContext } from "react";
import { contextStuff } from "../App";
import { userGames } from "../api/userGames";
import {
  gameDetails,
  gameDetailsCommunity,
  gameDetailsUser,
} from "../api/gameDetails";

export default function GameDetails() {
  const { loginref, gameref, handlePageChange } = useContext(contextStuff);
  const [game, setGame] = useState({});
  const [myRatingComment, setMyRatingComment] = useState({});
  const [allRatingsComments, setAllRatingsComments] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [gamesByCategory, setGamesByCategory] = useState(new Map());

  const isInCategory = (gameId, category) => {
    return gamesByCategory.has(category)
      ? gamesByCategory.get(category).some((g) => g.Id === gameId)
      : false;
  };

  const categories = [
    "ownedUserGames",
    "wishlistUserGames",
    "playedUserGames",
    "currentlyPlayingUserGames",
  ];

  function gameStatus1() {
    if (isInCategory(game.Id, "ownedUserGames")) {
      return <div style={{ color: "HSL(120, 50%, 70%)" }}>Owned</div>;
    } else if (isInCategory(game.Id, "wishlistUserGames")) {
      return <div style={{ color: "HSL(30, 70%, 70%)" }}>Wishlist</div>;
    }
  }

  function gameStatus2() {
    if (isInCategory(game.Id, "playedUserGames")) {
      return <div style={{ color: "HSL(200, 60%, 65%)" }}>Played</div>;
    } else if (isInCategory(game.Id, "currentlyPlayingUserGames")) {
      return (
        <div style={{ color: "HSL(280, 50%, 70%)" }}>Currently Playing</div>
      );
    }
  }

  function showUserThings() {
    if (loginref) {
      return (
        <div className="d-flex flex-row">
          <p className="lead me-3">my rating:</p>
          <div className="d-flex justify-content-start lead">
            <p className="me-3">
              {myRatingComment.Rating + "★" || "No rating"}
            </p>
            <p>{myRatingComment.Comment || "No comment"}</p>
          </div>
        </div>
      );
    }
  }

  function showCommunityThings() {
    return (
      <div>
        {allRatingsComments
          .filter((user) => user.User_Id !== loginref.current)
          .map((user, index) => (
            <div key={index} className="d-flex flex-row">
              <p className="lead me-3">{user.User_Id}:</p>
              <div className="d-flex justify-content-start lead">
                <p className="me-3">
                  {user.Rating ? user.Rating + "★" : "No rating"}
                </p>
                <p>{user.Comment || "No comment"}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }

  useEffect(() => {
    async function fetchGame() {
      try {
        const gameResponse = await gameDetails(gameref.current);

        const communityResponse = await gameDetailsCommunity(gameref.current);
        setGame(gameResponse);
        setAllRatingsComments(communityResponse);

        if (loginref) {
          const userResponse = await gameDetailsUser(
            gameref.current,
            loginref.current
          );
          setMyRatingComment(userResponse);

          const gameMap = new Map();

          for (let c of categories) {
            const userGamesResponse = await userGames(loginref.current, c);
            gameMap.set(c, userGamesResponse);
          }
          setGamesByCategory(gameMap);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
    fetchGame();
  }, []);

  return (
    <div className="container justify-content-center custom-game-page-container">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-3 pe-3 p-1 border-bottom border-secondary">
        <h2
          className="display-5"
          style={{ color: "HSL(0, 0%, 80%)", fontWeight: "bold" }}
        >
          {game.Title}
        </h2>
        <div
          className="d-flex flex-row"
          style={{ color: "HSL(0, 0%, 80%)", fontSize: "0.8rem" }}
        >
          <div className="me-3">{gameStatus1()}</div>
          <div className="ms-3">{gameStatus2()}</div>
        </div>
      </div>
      <div className="d-flex flex-column m-4">
        <div className="d-flex justify-content-between align-items-center mb-2 ">
          <div className="square-box-2">
            <img
              className="img-fluid img-cover"
              src={game.ImgPath}
              alt="game img"
            />
          </div>
          <div className="d-flex justify-content-start square-box-3 flex-column">
            <p className="lead">
              <strong>Developer: </strong>
              {game.Developer}
            </p>
            <p className="lead">
              <strong>Publisher: </strong>
              {game.Publisher}
            </p>
            <p className="lead">
              <strong>Release date: </strong>
              {new Date(game.ReleaseDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="lead">
              <strong>Genres: </strong>
              {game.Genres}
            </p>
            <p className="lead" style={{ marginTop: "auto" }}>
              <strong>Community Rating: </strong>
              {game.Rating ? game.Rating : "No ratings yet"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="display-6 mt-3">Ratings and comments</h3>
          <div className="d-flex flex-column custom-comment-box">
            {showUserThings()}
            {showCommunityThings()}
          </div>
        </div>
      </div>
    </div>
  );
}
