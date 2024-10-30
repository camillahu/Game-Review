import { useState, useEffect } from "react";
import RatingBox from "../components/GamePage/RatingBox";
import AddGameButtons from "../components/GamePage/AddGameButtons";
import EditRatingBox from "../components/GamePage/EditRatingBox";
import { calculateAvgRating } from "../utils/gamePageFunctions";
import { useParams } from "react-router-dom";
import { gameDetailsCommunity } from "../api/gameDetails";

export default function GamePage({
  loginref,
  allGamesWithStatus,
}) {
  const [gameData, setGameData] = useState(null);
  const { gameId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const [localCommunityRatings, setLocalCommunityRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [statusChangeSuccess, setStatusChangeSuccess] = useState(false);

  useEffect(() => {
    async function fetchRatings() {
      const response = await gameDetailsCommunity(Number(gameId));
      setLocalCommunityRatings(response);
    console.log(response);
    }
    fetchRatings();
    
  }, [gameId]); 


  useEffect(() => {
    if (allGamesWithStatus) {
      const game = allGamesWithStatus.find((g) => g.Id === Number(gameId));
      setGameData(game);
    }
  }, [gameId, allGamesWithStatus]);

 console.log(localCommunityRatings)

  if (!gameData) return <div>Loading game details...</div>;

  // async function handleRatingChange(rating) {
  //   const nullableRating = () => {
  //     return rating === "no rating" ? null : rating;
  //   };

  //   if (nullableRating() === null) {
  //     const userConfirmed = window.confirm(
  //       "If you remove your rating, your comment and finished status will also be removed. Do you want to proceed?"
  //     );

  //     if (!userConfirmed) {
  //       return;
  //     }

  //     try{
  //       const response = await deleteUserRating(loginref.current, gameref.current)
  //       handleEditingStatus();
  //       return;
  //     }
  //     catch(error) {
  //       console.log("error deleting row", error)
  //     }

  //   } else {
  //     setMyRatingComment((r) => ({ ...r, Rating: nullableRating() }));
  //   }
  // }

  // function handleCommentChange(comment) {
  //   setMyRatingComment((r) => ({ ...r, Comment: comment }));
  // }

  // function handleFinishedChange(finished) {
  //   setMyRatingComment((r) => ({ ...r, Finished: finished }));
  //   if (myRatingComment.dnf) {
  //     setMyRatingComment((r) => ({ ...r, dnf: false }));
  //   }
  // }

  // function handleDnfChange(dnf) {
  //   setMyRatingComment((r) => ({ ...r, dnf: dnf }));
  //   if (myRatingComment.Finished) {
  //     setMyRatingComment((r) => ({ ...r, Finished: false }));
  //   }
  // }

  // async function updateMyRating() {
  //   if(myRatingComment.rating === "no rating" || !myRatingComment.Rating) {
  //     const userConfirmed = window.confirm(
  //       "If you remove your rating, your comment and finished status will also be removed. Do you want to proceed?"
  //     );

  //     if (!userConfirmed) {
  //       return;
  //     }
  //     else {
  //       try{
  //         const response = await deleteUserRating(loginref.current, gameref.current)
  //         handleEditingStatus();
  //         return;
  //       }
  //       catch(error) {
  //         console.log("error deleting row", error)
  //       }
  //     }
  //   }
  //   try {
  //     const response = await postRatingComment(
  //       myRatingComment.Game_Id,
  //       myRatingComment.User_Id,
  //       myRatingComment.Rating,
  //       myRatingComment.Comment,
  //       myRatingComment.Finished,
  //       myRatingComment.dnf
  //     );
  //     handleEditingStatus();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function changeGameStatus(clickedStatus) {
  //   if (isChangingStatus) return;

  //   try {
  //     setIsChangingStatus(true);
  //     let statusChanged = false;

  //     switch (clickedStatus) {
  //       case "owned":
  //         gameCategories.isOwned
  //           ? await removeStatus("owned")
  //           : await addStatus("owned");
  //         if (gameCategories.isWishlist) await removeStatus("wishlist");
  //         statusChanged = true;
  //         break;
  //       case "wishlist":
  //         gameCategories.isWishlist
  //           ? await removeStatus("wishlist")
  //           : await addStatus("wishlist");
  //         if (gameCategories.isOwned) await removeStatus("owned");
  //         statusChanged = true;
  //         break;
  //       case "played":
  //         gameCategories.isPlayed
  //           ? await removeStatus("played")
  //           : await addStatus("played");
  //         if (gameCategories.isCurrentlyPlaying)
  //           await removeStatus("currentlyPlaying");
  //         statusChanged = true;
  //         break;
  //       case "currentlyPlaying":
  //         gameCategories.isCurrentlyPlaying
  //           ? await removeStatus("currentlyPlaying")
  //           : await addStatus("currentlyPlaying");
  //         if (gameCategories.isPlayed) await removeStatus("played");
  //         statusChanged = true;
  //         break;
  //       default:
  //         console.error("Invalid status");
  //     }
  //     if (statusChanged) setStatusChangeSuccess(true);
  //   } catch (error) {
  //     console.error("Error changing game status", error);
  //   } finally {
  //     setIsChangingStatus(false);
  //   }
  // }

  // async function removeStatus(chosenTable) {
  //   try {
  //     await removeGameStatus(chosenTable, game.Id, loginref.current);
  //   } catch (error) {
  //     console.error("Error removing status", error);
  //   }
  // }

  // async function addStatus(chosenTable) {
  //   try {
  //     await addGameStatus(chosenTable, game.Id, loginref.current);
  //   } catch (error) {
  //     console.error("Error adding status", error);
  //   }
  // }

  // function userCommentBox() {
  //   if (!loginref.current) return null
  //     return isEditing ? (
  //       <EditRatingBox
  //         // updateMyRating={updateMyRating}
  //         rating={myLocalRating.Rating}
  //         comment={myLocalRating.Comment}
  //         isFinished={myLocalRating.Finished}
  //         isDNF={myLocalRating.dnf}
  //         // setRating={handleRatingChange}
  //         // setComment={handleCommentChange}
  //         // setFinishedStatus={handleFinishedChange}
  //         // setDnfStatus={handleDnfChange}
  //       />
  //     ) : (
  //       <RatingBox
  //         loggedInUser={loginref.current}
  //         username={myRatingComment.User_Id}
  //         rating={myRatingComment.Rating}
  //         comment={myRatingComment.Comment}
  //         isFinished={myRatingComment.Finished}
  //         isDNF={myRatingComment.dnf}
  //         handleEditingStatus={handleEditingStatus}
  //       />
  //     )
  //   }

  function gameStatusVisability() {
    if (!loginref.current) return null;
    return (
      <AddGameButtons
        isOwned={gameData.Statuses?.includes("Owned") ? true : false}
        isWishlist={gameData.Statuses?.includes("Wishlist") ? true : false}
        isPlayed={gameData.Statuses?.includes("Played") ? true : false}
        isCurrentlyPlaying={
          gameData.Statuses?.includes("Currently Playing") ? true : false
        }
      />
    );
  }
  console.log(localCommunityRatings);


  return (
    <div className="container justify-content-center custom-game-page-container">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-3 pe-3 p-1 border-bottom border-secondary">
        <h2
          className="display-5"
          style={{ color: "HSL(30, 20%, 85%)", fontWeight: 500 }}
        >
          {gameData.Title}
        </h2>
        {gameStatusVisability()}
      </div>

      <div className="d-flex flex-column m-4">
        <div className="d-flex justify-content-between align-items-center mb-2 ">
          <div className="square-box-2">
            <img
              className="img-fluid img-cover"
              src={gameData.ImgPath}
              alt="game img"
            />
          </div>
          <div className="d-flex justify-content-start square-box-3 flex-column">
            <p className="lead">
              <strong>Developer: </strong>
              {gameData.Developer}
            </p>
            <p className="lead">
              <strong>Publisher: </strong>
              {gameData.Publisher}
            </p>
            <p className="lead">
              <strong>Release date: </strong>
              {new Date(gameData.ReleaseDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="lead">
              <strong>Genres: </strong>
              {gameData.Genres}
            </p>
            <p className="lead" style={{ marginTop: "auto" }}>
              <strong>Community Rating: </strong>
              {calculateAvgRating([]) || "No ratings yet"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="display-6 mt-2" style={{ color: "HSL(30, 20%, 85%)" }}>
            Ratings and comments
          </h3>
          <div className="d-flex flex-column ">
            {/* disse viser kun brukeren sin rating om den er logget inn, og bytter mellom edit og ikke edit
            ut i fra boolen isEditing som blir styrt fra de to komponentene under.  */}
            {loginref.current ? (
              isEditing ? (
                <EditRatingBox
                  rating={localCommunityRatings.find(
                    (r) => r.User_Id === loginref.current
                  ) || null}
                  setIsEditing={setIsEditing}
                  username={loginref.current}
                />
              ) : (
                <RatingBox
                  rating={localCommunityRatings.find(
                    (r) => r.User_Id === loginref.current
                  ) || null}
                  setIsEditing={setIsEditing}
                  username={loginref.current}
                />
              )
            ) : null}
            {/* noe jeg kan forbedre her? */}
            {/* denne viser alle ratings for spillet utenom brukeren sin rating(for å ikke få to ratings fra bruker) */}
            {localCommunityRatings
            .filter((r)=> (r?.User_Id !== loginref.current))
            .map((rating, index) => (
              <RatingBox
                key={index}
                rating={rating || {}}
                setIsEditing={setIsEditing}
                username={loginref.current}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
