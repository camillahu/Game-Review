
export async function login(username, password) { 
    try {
        const response = await fetch('http://localhost:3000/localdb/login', { 
            method: 'POST', 
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        if (!response.ok) {
            const errorText = await response.text(); 
            console.error("Error response:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Login request failed:', error);
        throw error; 
    }
}