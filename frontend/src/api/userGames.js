export const userGames = async (username, view) => {
 
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
};

export const genresForPieChart = async(username) => {
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
