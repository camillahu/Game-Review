
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
            if (response.status >= 400 && response.status < 500) { //lager en kort og konsis error- msg for 400-statuser
                const errorData = await response.json();
                return { error: errorData.message }; 
            }

            if (response.status >= 500) {
                throw new Error(`Server error! status: ${response.status}`);
            }
        }

        return await response.json(); 
    } catch (error) {
        console.error('Login request failed:', error);
        throw error; 
    }
}