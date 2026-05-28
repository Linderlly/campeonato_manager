export function advanceWinner(match) {
  if (match.score1 > match.score2) {
    return match.player1
  }

  return match.player2
}