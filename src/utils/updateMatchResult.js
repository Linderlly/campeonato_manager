export function updateMatchResult(
  rounds,
  roundIndex,
  matchIndex,
  score1,
  score2
) {
  const updatedRounds = [
    ...rounds,
  ]

  const match =
    updatedRounds[roundIndex][
      matchIndex
    ]

  match.score1 = score1
  match.score2 = score2

  match.finished = true

  // WINNER
  const winner =
    score1 > score2
      ? match.player1
      : match.player2

  match.winner = winner

  // NEXT ROUND
  if (
    roundIndex + 1 <
    updatedRounds.length
  ) {
    const nextMatchIndex =
      Math.floor(matchIndex / 2)

    const nextMatch =
      updatedRounds[
        roundIndex + 1
      ][nextMatchIndex]

    if (matchIndex % 2 === 0) {
      nextMatch.player1 =
        winner
    } else {
      nextMatch.player2 =
        winner
    }
  }

  return updatedRounds
}