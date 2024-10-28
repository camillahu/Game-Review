import { useState, useEffect } from "react";
import RatingBox from "../RatingBox";
import AddGameButtons from "../AddGameButtons";
import EditRatingBox from "../EditRatingBox";
import { useParams } from "react-router-dom";



export default function GamePage({loginref, allGames}) {
const [gameData, setGameData] = useState(null);
const {gameId} = useParams();

useEffect(() => {
    const game = allGames.find((g) => g.Id === parseInt(gameId));
    setGameData(game);
  }, [gameId]);

if (!gameData) return <div>Loading game details...</div>;

  const [myRatingComment, setMyRatingComment] = useState({});
  const [allRatingsComments, setAllRatingsComments] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [gamesByCategory, setGamesByCategory] = useState(new Map());
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [statusChangeSuccess, setStatusChangeSuccess] = useState(false);

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

  function handleEditingStatus() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }

  async function handleRatingChange(rating) {
    const nullableRating = () => {
      return rating === "no rating" ? null : rating;
    };

    if (nullableRating() === null) {
      const userConfirmed = window.confirm(
        "If you remove your rating, your comment and finished status will also be removed. Do you want to proceed?"
      );

      if (!userConfirmed) {
        return;
      }

      try{
        const response = await deleteUserRating(loginref.current, gameref.current)
        handleEditingStatus();
        return;
      }
      catch(error) {
        console.log("error deleting row", error)
      }

    } else {
      setMyRatingComment((r) => ({ ...r, Rating: nullableRating() }));
    }
  }

  function handleCommentChange(comment) {
    setMyRatingComment((r) => ({ ...r, Comment: comment }));
  }

  function handleFinishedChange(finished) {
    setMyRatingComment((r) => ({ ...r, Finished: finished }));
    if (myRatingComment.dnf) {
      setMyRatingComment((r) => ({ ...r, dnf: false }));
    }
  }

  function handleDnfChange(dnf) {
    setMyRatingComment((r) => ({ ...r, dnf: dnf }));
    if (myRatingComment.Finished) {
      setMyRatingComment((r) => ({ ...r, Finished: false }));
    }
  }

  async function updateMyRating() {
    if(myRatingComment.rating === "no rating" || !myRatingComment.Rating) {
      const userConfirmed = window.confirm(
        "If you remove your rating, your comment and finished status will also be removed. Do you want to proceed?"
      );

      if (!userConfirmed) {
        return;
      }
      else {
        try{
          const response = await deleteUserRating(loginref.current, gameref.current)
          handleEditingStatus();
          return;
        }
        catch(error) {
          console.log("error deleting row", error)
        }
      }
    }
    try {
      const response = await postRatingComment(
        myRatingComment.Game_Id,
        myRatingComment.User_Id,
        myRatingComment.Rating,
        myRatingComment.Comment,
        myRatingComment.Finished,
        myRatingComment.dnf
      );
      handleEditingStatus();
    } catch (error) {
      console.log(error);
    }
  }

  const gameCategories = useMemo(
    () => ({
      isOwned: isInCategory(game.Id, "ownedUserGames"),
      isWishlist: isInCategory(game.Id, "wishlistUserGames"),
      isPlayed: isInCategory(game.Id, "playedUserGames"),
      isCurrentlyPlaying: isInCategory(game.Id, "currentlyPlayingUserGames"),
    }),
    [gamesByCategory, game.Id, loginref]
  ); //useMemo gjør sånn at vi ikke trenger å fetche på nytt fra db
  //med mindre gamesByCategory eller game.Id endres når de skal sendes til buttons.

  async function changeGameStatus(clickedStatus) {
    if (isChangingStatus) return;

    try {
      setIsChangingStatus(true);
      let statusChanged = false;

      switch (clickedStatus) {
        case "owned":
          gameCategories.isOwned
            ? await removeStatus("owned")
            : await addStatus("owned");
          if (gameCategories.isWishlist) await removeStatus("wishlist");
          statusChanged = true;
          break;
        case "wishlist":
          gameCategories.isWishlist
            ? await removeStatus("wishlist")
            : await addStatus("wishlist");
          if (gameCategories.isOwned) await removeStatus("owned");
          statusChanged = true;
          break;
        case "played":
          gameCategories.isPlayed
            ? await removeStatus("played")
            : await addStatus("played");
          if (gameCategories.isCurrentlyPlaying)
            await removeStatus("currentlyPlaying");
          statusChanged = true;
          break;
        case "currentlyPlaying":
          gameCategories.isCurrentlyPlaying
            ? await removeStatus("currentlyPlaying")
            : await addStatus("currentlyPlaying");
          if (gameCategories.isPlayed) await removeStatus("played");
          statusChanged = true;
          break;
        default:
          console.error("Invalid status");
      }
      if (statusChanged) setStatusChangeSuccess(true);
    } catch (error) {
      console.error("Error changing game status", error);
    } finally {
      setIsChangingStatus(false);
    }
  }

  async function removeStatus(chosenTable) {
    try {
      await removeGameStatus(chosenTable, game.Id, loginref.current);
    } catch (error) {
      console.error("Error removing status", error);
    }
  }

  async function addStatus(chosenTable) {
    try {
      await addGameStatus(chosenTable, game.Id, loginref.current);
    } catch (error) {
      console.error("Error adding status", error);
    }
  }

  function calculateAvgRating(gameRatings) {
    const sum = gameRatings.reduce((a, c) => a + c, 0);
    const average = (sum / gameRatings.length).toFixed(2);
    !isNaN(average) ? setAverageRating(average) : setAverageRating(null);
  }

  function userCommentBox() {
    if (!loginref.current) return null
      return isEditing ? (
        <EditRatingBox
          updateMyRating={updateMyRating}
          rating={myRatingComment.Rating}
          comment={myRatingComment.Comment}
          isFinished={myRatingComment.Finished}
          isDNF={myRatingComment.dnf}
          setRating={handleRatingChange}
          setComment={handleCommentChange}
          setFinishedStatus={handleFinishedChange}
          setDnfStatus={handleDnfChange}
        />
      ) : (
        <RatingBox
          loggedInUser={loginref.current}
          username={myRatingComment.User_Id}
          rating={myRatingComment.Rating}
          comment={myRatingComment.Comment}
          isFinished={myRatingComment.Finished}
          isDNF={myRatingComment.dnf}
          handleEditingStatus={handleEditingStatus}
        />
      )
    }

  function gameStatusVisability() {
    if(!loginref.current) return null;
    return <AddGameButtons
    isOwned={gameCategories.isOwned}
    isWishlist={gameCategories.isWishlist}
    isPlayed={gameCategories.isPlayed}
    isCurrentlyPlaying={gameCategories.isCurrentlyPlaying}
    changeGameStatus={changeGameStatus}
  />
  }

  useEffect(() => {
    async function fetchGame() {
      try {
        const [gameResponse, communityResponse] = await Promise.all([
          gameDetails(gameref.current),
          gameDetailsCommunity(gameref.current),
        ]);

        setGame(gameResponse);
        setAllRatingsComments(communityResponse);

        const gameRatings = await ratingsByGame(gameref.current); //ikke rør  rekkefølgen her, endelig funka det!
        calculateAvgRating(gameRatings);

        if (loginref) {
          const userResponse = await gameDetailsUser(
            gameref.current,
            loginref.current
          );
          setMyRatingComment(userResponse);

          const categoryPromises = categories.map((c) =>
            userGames(loginref.current, c)
          );
          const results = await Promise.all(categoryPromises);
          //optimalisert for å ikke bruke så mye ressurser med Promise.all.
          //Promise.all kjører alle requestene parallelt.

          const gameMap = new Map();
          categories.forEach((category, index) => {
            gameMap.set(category, results[index]);
          });

          setGamesByCategory(gameMap);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }

    fetchGame();

    if (statusChangeSuccess) {
      fetchGame();
      setStatusChangeSuccess(false);
    }
  }, [loginref, gameref, statusChangeSuccess, isEditing]);

  return (
    <div className="container justify-content-center custom-game-page-container">
      {/* <div className="d-flex justify-content-between align-items-center mb-3 ps-3 pe-3 p-1 border-bottom border-secondary">
        <h2
          className="display-5"
          style={{ color: "HSL(30, 20%, 85%)", fontWeight: 500 }}
        >
          {game.Title}
        </h2>
        {gameStatusVisability()}
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
              {averageRating ? averageRating : "No ratings yet"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="display-6 mt-2" style={{ color: "HSL(30, 20%, 85%)" }}>
            Ratings and comments
          </h3>
            <div className="d-flex flex-column ">
            {userCommentBox()}
            {allRatingsComments
              .filter((user) => user.User_Id !== loginref.current)
              .map((user, index) => (
                <RatingBox
                  key={index}
                  loggedInUser={loginref.current}
                  username={user.User_Id}
                  rating={user.Rating}
                  comment={user.Comment}
                  isFinished={user.Finished}
                  isDNF={user.dnf}
                />
              ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
