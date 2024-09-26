export const allUserGames = async (username) => {
  
  try {
    const response = await fetch(`http://localhost:3000/localdb/allUserGames?username=${username}`, {
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
};

export const ownedUserGames = async (username) => {
  
  try {
    const response = await fetch(`http://localhost:3000/localdb/ownedUserGames?username=${username}`, {
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
};

export const wishlistUserGames = async (username) => {
  
  try {
    const response = await fetch(`http://localhost:3000/localdb/wishlistUserGames?username=${username}`, {
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
};

export const playedUserGames = async (username) => {
  
  try {
    const response = await fetch(`http://localhost:3000/localdb/playedUserGames?username=${username}`, {
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
};

export const currentlyPlayingUserGames = async (username) => {
  
  try {
    const response = await fetch(`http://localhost:3000/localdb/currentlyPlayingUserGames?username=${username}`, {
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
};
