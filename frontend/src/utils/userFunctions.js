
export function profileFunctions(games, status) {
  const statusarray = games.filter((g) => g.Statuses?.includes(status));
  return statusarray.length;
}

export function pieChartFunction(games) {
  const gamesArray = games.filter((g) => g.Statuses?.includes("Played"));
  const genreCount = {};

  gamesArray.forEach((g) => {
    const genresArray = g.Genres.split(", ");
    genresArray.forEach((genre) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  const sortedGenres = Object.entries(genreCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5);

  return sortedGenres;
  
}