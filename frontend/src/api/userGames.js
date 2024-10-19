export const userGames = async (username, view) => {
  try {
    const response = await fetch(`http://localhost:3000/localdb/${view}?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  catch (error) {
    console.error("Game request failed:", error);
    throw error;
  }
  
};

export const genresForPieChart = async(username) => {
  try {
    const response = await fetch(`http://localhost:3000/localdb/genresForPieChart?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  catch (error) {
    console.error("Game request failed:", error);
    throw error;
  }
  }
 


export async function userRatings(username) {
  try {
    const response = await fetch(`http://localhost:3000/localdb/userRatings?username=${username}`, {
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

export async function deleteUserRating(username, gameId) {
  try {
    const response = await fetch(`http://localhost:3000/localdb/deleteUserRating`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, gameId})
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
