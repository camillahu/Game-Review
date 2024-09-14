export async function login(username, password) { //tar imot input fra klienten
    return fetch('localdb/login', { 
        //fetch er en innebugd JS-funksjon som utfører HTTP-requests. Den returnerer et promise som garanterer et svar (promise er ikke svaret i seg selv).
        //når dataen har blitt 
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({username, password})
    });
}