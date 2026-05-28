import {
  motion
} from "framer-motion"

import {
  X,
  Users,
  Trophy,
} from "lucide-react"

export default function TournamentModal({
  tournament,
  onClose,
  onDraw,
}) {
  return (
    <div
      className="
        fixed
        inset-0

        bg-black/70

        z-[100]

        flex
        items-center
        justify-center

        p-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          w-full
          max-w-3xl

          bg-[#020617]

          border
          border-cyan-500/20

          rounded-3xl

          p-8

          backdrop-blur-xl
        "
      >
        {/* TOP */}
        <div
          className="
            flex
            items-start
            justify-between

            mb-8
          "
        >
          <div>
            <h1
              className="
                text-4xl
                font-black
                text-white
              "
            >
              {tournament.name}
            </h1>

            <p
              className="
                text-cyan-400
                mt-2
              "
            >
              Código:
              {" "}
              {tournament.code}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              text-white
            "
          >
            <X />
          </button>
        </div>

        {/* PLAYERS */}
        <div className="mb-10">
          <div
            className="
              flex
              items-center
              gap-3

              mb-5
            "
          >
            <Users
              className="
                text-cyan-400
              "
            />

            <h2
              className="
                text-2xl
                font-black
                text-white
              "
            >
              Jogadores
            </h2>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >
            {tournament.players?.map(
              (player) => (
                <div
                  key={player.uid}
                  className="
                    bg-white/5

                    border
                    border-white/10

                    rounded-2xl

                    p-4

                    text-white
                  "
                >
                  {player.username}
                </div>
              )
            )}
          </div>
        </div>

        {/* BUTTON */}
        {!tournament.started &&
          tournament.players
            ?.length ===
            tournament.maxPlayers && (
            <button
              onClick={onDraw}
              className="
                w-full

                bg-cyan-500
                hover:bg-cyan-400

                text-black
                font-black

                py-5

                rounded-2xl

                transition-all

                cursor-pointer

                flex
                items-center
                justify-center
                gap-3
              "
            >
              <Trophy />

              Sortear Chaveamento
            </button>
          )}
      </motion.div>
    </div>
  )
}