export async function userDetails(username) {
    try {
      const response = await fetch(`http://localhost:3000/localdb/userDetails?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Game request failed:", error);
      throw error;
    }
  }