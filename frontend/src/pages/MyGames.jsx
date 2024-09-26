import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from '../components/GameCard';
import { allUserGames } from '../api/userGames';

function MyGames({ loginref, handlePageChange }) {
    
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchGames() {
            try{
                const response = await allUserGames(loginref.current);
                setGames(response);
            }
            catch (error) {
                console.error('Error fetching games:', error);
            }
        }
        fetchGames();
    }, []);


    return(<div className="p-2 container">
        <h2 className='display-3 text-center' style = {{color: "HSL(0, 0%, 80%)", fontWeight: 'bold'}}>My games</h2>
        <div className="row justify-content-center">
            {games.map((game => <GameCard key={game.Id} 
            title={game.Title}
            developer={game.Developer}
            publisher={game.Publisher}
            releaseDate={game.ReleaseDate}
            genres = {game.Genres}
            imgPath = {game.ImgPath}
            />
            ))}
        </div>
        
    </div>)

}

export default MyGames;
