
export function calculateAvgRating(gameRatings) {
    const sum = gameRatings.reduce((a, c) => a + c, 0);
    const average = (sum / gameRatings.length).toFixed(2);
    return !isNaN(average) ? average : null;
  }