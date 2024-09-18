import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from '../components/GameCard';

function Home() {
    
    const [games, setGames] = useState([])

    return(<div className="p-2" style={{}}>
        <GameCard/>
    </div>)

}

export default Home;
