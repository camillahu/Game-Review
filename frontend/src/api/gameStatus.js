
export async function removeGameStatus(chosenStatus, gameId, username) {
    // console.log(chosenStatus, gameId, username)
    try {
        const response = await fetch(
            `http://localhost:3000/localdb/removeGameStatus`, {
            method: 'DELETE',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chosenStatus, gameId, username})
        });
        return response; 
    } catch(error) {
        console.error('delete request failed ', error);
        throw error;
    }
}

export async function addGameStatus(chosenStatus, gameId, username) {
    try {
        const response = await fetch(
            `http://localhost:3000/localdb/addGameStatus`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chosenStatus, gameId, username})
        });
        return response; 
    } catch(error) {
        console.error('add request failed ', error);
        throw error;
    }
}


export async function statusNames() {
    try {
        const response = await fetch(
            `http://localhost:3000/localdb/statusNames`, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json'
            },
        });
        return response.json(); 
    } catch(error) {
        console.error('add request failed ', error);
        throw error;
    }
}
