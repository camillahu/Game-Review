
export async function signup(username, password) {
    try {
        const response = await fetch('http://localhost:3000/localdb/signup', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
    
        return response; 
    } catch(error) {
        console.error('signup request failed ', error);
        throw error;
    }
}
