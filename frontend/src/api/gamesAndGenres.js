export async function gamesAndGenres() {
  try {
    const response = await fetch("http://localhost:3000/localdb/games", {
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

export async function genres() {
  try {
    const response = await fetch("http://localhost:3000/localdb/genres", {
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
    console.error("Genre request failed:", error);
    throw error;
  }
}
