
export function calculateAvgRating(gameRatings) {
  if (!gameRatings || gameRatings.length === 0) return null;
  const ratings = gameRatings.map((r) => r.Rating);
  const sum = ratings.reduce((a, c) => a + c, 0);
  const average = (sum / gameRatings.length).toFixed(2);
  return !isNaN(average) ? average : null;
}
