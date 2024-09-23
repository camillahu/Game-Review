import {useState} from "react"
import GameCard from "../components/GameCard";
import steamGames from "../api/steamGames";

function Home() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchGames() {
            try{
                const response = await steamGames();
                setGames(response);
            }
            catch (error) {
                console.error('Error fetching games:', error);
            }
        }
        fetchGames();
    }, []);


    return(
        <div>
            {games.map((game => <GameCard />
        //props her 
        
        ))}
        </div>
    )
}

export default Home