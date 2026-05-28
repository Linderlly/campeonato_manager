export function generateBracket(
  players
) {
  // EMBARALHAR
  const shuffled = [
    ...players,
  ].sort(
    () => Math.random() - 0.5
  )

  const rounds = []

  // PRIMEIRA RODADA
  let firstRound = []

  for (
    let i = 0;
    i < shuffled.length;
    i += 2
  ) {
    firstRound.push({
      id: crypto.randomUUID(),

      player1: shuffled[i],

      player2:
        shuffled[i + 1],

      score1: 0,

      score2: 0,

      winner: null,

      finished: false,
    })
  }

  rounds.push(firstRound)

  // PRÓXIMAS RODADAS
  let matches =
    firstRound.length

  while (matches > 1) {
    matches = matches / 2

    const nextRound = []

    for (
      let i = 0;
      i < matches;
      i++
    ) {
      nextRound.push({
        id: crypto.randomUUID(),

        player1: null,

        player2: null,

        score1: 0,

        score2: 0,

        winner: null,

        finished: false,
      })
    }

    rounds.push(nextRound)
  }

  return rounds
}