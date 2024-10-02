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
  const [allRatingsComments, setAllRatingsComments] = useState({});
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
      <div className="d-flex justify-content-between">
        <h2
          className="h-2"
          style={{ color: "HSL(0, 0%, 80%)", fontWeight: "bold" }}
        >
          {game.Title}
        </h2>
        <div className="d-flex justify-content-between align-items-center mb-2 mt-auto">
          <div style={{ color: "HSL(0, 0%, 80%)", fontSize: "0.8rem" }}>
            {gameStatus1()}
            {gameStatus2()}
          </div>
        </div>
      </div>
    </div>
  );
}
