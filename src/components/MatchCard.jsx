import { motion } from "framer-motion"

export default function MatchCard({
  match,
  isAdmin,
  onUpdate
}) {
  function handleWinner(
    player1Wins
  ) {
    const updated = {
      ...match,

      score1: player1Wins ? 1 : 0,

      score2: player1Wins ? 0 : 1,

      winner: player1Wins
        ? match.player1
        : match.player2,

      finished: true,
    }

    onUpdate(updated)
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="
        min-w-[280px]

        bg-white/5
        backdrop-blur-xl

        border
        border-cyan-500/20

        rounded-3xl

        p-5

        shadow-[0_0_30px_rgba(0,255,255,0.08)]
      "
    >
      {/* PLAYER 1 */}
      <div
        className={`
          p-4
          rounded-2xl
          mb-3

          flex
          items-center
          justify-between

          ${
            match.winner?.uid ===
            match.player1?.uid
              ? `
                bg-green-500/20
                border
                border-green-500/30
              `
              : `
                bg-white/5
              `
          }
        `}
      >
        <span className="font-bold">
          {match.player1?.username ||
            "Aguardando"}
        </span>

        <span className="font-black">
          {match.score1}
        </span>
      </div>

      {/* PLAYER 2 */}
      <div
        className={`
          p-4
          rounded-2xl

          flex
          items-center
          justify-between

          ${
            match.winner?.uid ===
            match.player2?.uid
              ? `
                bg-green-500/20
                border
                border-green-500/30
              `
              : `
                bg-white/5
              `
          }
        `}
      >
        <span className="font-bold">
          {match.player2?.username ||
            "Aguardando"}
        </span>

        <span className="font-black">
          {match.score2}
        </span>
      </div>

      {/* ADMIN ACTIONS */}
      {isAdmin &&
        !match.finished &&
        match.player1 &&
        match.player2 && (
          <div className="mt-5 space-y-3">
            <button
              onClick={() =>
                handleWinner(true)
              }
              className="
                w-full
                bg-green-500
                hover:bg-green-400

                py-3
                rounded-2xl

                font-black

                cursor-pointer
              "
            >
              Vitória{" "}
              {match.player1.username}
            </button>

            <button
              onClick={() =>
                handleWinner(false)
              }
              className="
                w-full
                bg-blue-500
                hover:bg-blue-400

                py-3
                rounded-2xl

                font-black

                cursor-pointer
              "
            >
              Vitória{" "}
              {match.player2.username}
            </button>
          </div>
        )}
    </motion.div>
  )
}