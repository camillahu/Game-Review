import {useState, useEffect, useContext} from 'react';
import { contextStuff } from '../App';
import { gameDetails, gameDetailsCommunity, gameDetailsUser } from '../api/gameDetails';

export default function GameDetails() {

    const {loginref, gameref, handlePageChange} = useContext(contextStuff);
    const [game, setGame] = useState({});
    const [myRatingComment, setMyRatingComment] = useState({});
    const [allRatingsComments, setAllRatingsComments] = useState({});
    const [userInput, setUserInput] = useState({})

    useEffect(() => {
        async function fetchGame() {
            try {
                const gameResponse = await gameDetails(gameref.current);
                const communityResponse = await gameDetailsCommunity(gameref.current);
                setGame(gameResponse);
                setAllRatingsComments(communityResponse)
                console.log(gameResponse)

                if(loginref) {
                    const userResponse = await gameDetailsUser(gameref.current, loginref.current);
                    setMyRatingComment(userResponse);
                }
            }
            catch(error) {
                console.error("Error fetching games:", error);
            }
        }
        fetchGame();
    }, [])


    return (<div className="container justify-content-center custom-game-page-container">
        <div className="d-flex justify-content-between">
            <h2 className="h-2" style={{ color: "HSL(0, 0%, 80%)", fontWeight: "bold" }}>{game.Title}</h2>
        </div>
    </div>)

}