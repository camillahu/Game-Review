
export function profileFunctions(games, status) {
    const statusarray = games.filter((g)=> g.Statuses.includes(status));
    return statusarray.length;
}