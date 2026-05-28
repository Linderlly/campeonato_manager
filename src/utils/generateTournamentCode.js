export function generateTournamentCode() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"

  let result = "FIFA-"

  for (let i = 0; i < 5; i++) {
    result +=
      chars[
        Math.floor(
          Math.random() *
            chars.length
        )
      ]
  }

  return result
}