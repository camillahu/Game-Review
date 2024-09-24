import {useState, useEffect} from "react"
import GameCard from "../components/GameCard";
import {steamGames} from "../api/steamGames";

function Home() {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchGames() {
            setLoading(true);
            try{
                const response = await steamGames();
                console.log("res", response)
                setGames(response.applist.apps);
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching games:', error);
            }
        }
        fetchGames();
    }, []);


    return(
        <div>
            <div>{loading ? "loading games" : ""}</div>
            {games.map((game => <li key={game.appid}>{game.name}</li>
            
            // <GameCard />
        //props her 
        
        ))}
    

        </div>
    )
}

export default Home