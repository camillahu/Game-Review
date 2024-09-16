
export async function signup() {
    try {
        const response = await fetch('http://localhost:3000/localdb/signup', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        return await response.json(); 
    } catch(error) {
        console.error('signup request failed ', error);
        throw error;
    }
}
