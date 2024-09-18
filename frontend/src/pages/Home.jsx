import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from '../components/GameCard';
import { gamesAndGenres } from '../api/gamesAndGenres';

function Home() {
    
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchGames() {
            try{
                const response = await gamesAndGenres();
                console.log(response)
            }
            catch (error) {
                console.error('Error fetching games:', error);
            }
        }
        fetchGames();
    }, []);


    return(<div className="p-2">
        <GameCard/>
    </div>)

}

export default Home;
