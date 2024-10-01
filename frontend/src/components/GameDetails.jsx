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
                const gameResponse = await gameDetails(gameref);
                const communityResponse = await gameDetailsCommunity(gameref);
                setGame(gameResponse);
                setAllRatingsComments(communityResponse)

                if(loginref) {
                    const userResponse = await gameDetailsUser(gameref, loginref);
                    setMyRatingComment(userResponse);
                }
            }
            catch(error) {
                console.error("Error fetching games:", error);
            }
        }
        fetchGame();
    }, [userInput])


    return (<div>
        
    </div>)

}