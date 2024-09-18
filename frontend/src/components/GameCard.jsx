import ACO from '../assets/img/ACO.png' //midlertidig hardcode

function GameCard() {

    return(<>
        <div className="card p-3" 
        style={{width: '18rem', height: '26rem', backgroundColor: 'HSL(210, 15%, 25%)'}}>
            <img className="mb-2"src={ACO} alt="game img" />
            <div>
                <p className="h5" style={{color:'HSL(0, 0%, 80%)'}} >Assassins Creed Odyssey</p>
                <p className="lead d-inline-block text-truncate" style={{color:'HSL(0, 0%, 80%)'}}>game.genres</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-light" style= {{}}>View details</button>
                    </div>
            </div>
        </div>
    </>)
}

export default GameCard;