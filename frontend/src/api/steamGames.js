

export async function steamGames() {
      try {
        const response = await fetch("http://localhost:3000/api/steam", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Steam game request failed:", error);
        throw error;
      } 
    };

