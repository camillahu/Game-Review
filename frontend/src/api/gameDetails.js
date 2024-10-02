export async function gameDetails(gameId) {
    try {
      const response = await fetch(`http://localhost:3000/localdb/gameDetails?gameId=${gameId}`, {
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

export async function gameDetailsCommunity(gameId) {
    try {
      const response = await fetch(`http://localhost:3000/localdb/gameDetailsCommunity?gameId=${gameId}`, {
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

export async function gameDetailsUser(gameId, username) {
    try {
      const response = await fetch(`http://localhost:3000/localdb/gameDetailsUser?gameId=${gameId}&username=${username}`, {
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