export function shufflePlayers(players) {
  return players.sort(() => Math.random() - 0.5)
}