// export async function login(username, password) { //tar imot input fra klienten
//     return fetch(`http://localhost:3000/localdb/login`, { 
//         //fetch er en innebugd JS-funksjon som utfører HTTP-requests. Den returnerer et promise som garanterer et svar (promise er ikke svaret i seg selv).
//         //når dataen har blitt henta fra db og blir sendt(eller ikke sendt) tilbake så får man et respons-objekt. 
//         method: 'POST', // sier hvilken HTTP-metode som skal brukes- POST brukes vanligvis til å sende data til serveren. I dette tilfellet sender den login-info til serveren. 
//         headers: {  //forteller serveren at den kan forvente JSON- data i bodyen
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({username, password}) //konverterer dataen i body til JSON
//     });
// }

export async function login(username, password) { 
    try {
        const response = await fetch('http://localhost:3000/localdb/login', { 
            method: 'POST', 
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        // console.log(username);
        if (!response.ok) {
            const errorText = await response.text(); // Read the full response error body
            console.error("Error response:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); // Convert the response to JSON
    } catch (error) {
        console.error('Login request failed:', error);
        throw error; // rethrow the error to handle it in the caller function
    }
}