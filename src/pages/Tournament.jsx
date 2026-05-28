import {
  useEffect,
  useState,
} from "react"

import {
  useParams,
} from "react-router-dom"

import {
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"

import {
  motion,
} from "framer-motion"

import {
  Trophy,
  Crown,
  Swords,
} from "lucide-react"

import Confetti from "react-confetti"

import Sidebar from "../components/Sidebar"

import {
  db,
} from "../services/firebase"

import {
  useAuth,
} from "../hooks/useAuth"

import {
  updateMatchResult,
} from "../utils/updateMatchResult"

export default function Tournament() {
  const { id } = useParams()

  const {
    userData,
  } = useAuth()

  const [tournament, setTournament] =
    useState(null)

  const [scores, setScores] =
    useState({})

  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        doc(
          db,
          "tournaments",
          id
        ),
        (snapshot) => {
          setTournament({
            id: snapshot.id,
            ...snapshot.data(),
          })
        }
      )

    return () => unsubscribe()
  }, [id])

  if (!tournament)
    return null

  const isAdmin =
    userData?.role === "admin"

  async function finishMatch(
    roundIndex,
    matchIndex
  ) {
    try {
      const match =
        tournament.rounds[
          roundIndex
        ][matchIndex]

      const score1 =
        Number(
          scores[
            `${match.id}-1`
          ] || 0
        )

      const score2 =
        Number(
          scores[
            `${match.id}-2`
          ] || 0
        )

      if (score1 === score2) {
        alert(
          "Não pode empate"
        )

        return
      }

      const updatedRounds =
        updateMatchResult(
          tournament.rounds,
          roundIndex,
          matchIndex,
          score1,
          score2
        )

      // CHAMPION
      let champion = null

      const finalRound =
        updatedRounds[
          updatedRounds.length - 1
        ]

      const finalMatch =
        finalRound[0]

      if (
        finalMatch.finished
      ) {
        champion =
          finalMatch.winner
      }

      await updateDoc(
        doc(
          db,
          "tournaments",
          tournament.id
        ),
        {
          rounds:
            updatedRounds,

          champion,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#020617]
        text-white
      "
    >
      {/* CONFETTI */}
      {tournament.champion && (
        <Confetti />
      )}

      <Sidebar />

      <div
        className="
          lg:ml-[260px]

          p-6
        "
      >
        {/* HEADER */}
        <div className="mb-12">
          <div
            className="
              flex
              items-center
              gap-4

              mb-4
            "
          >
            <div
              className="
                w-20
                h-20

                rounded-3xl

                bg-cyan-500/20

                flex
                items-center
                justify-center

                shadow-[0_0_30px_rgba(0,255,255,0.15)]
              "
            >
              <Trophy
                className="
                  text-cyan-400
                "
                size={40}
              />
            </div>

            <div>
              <h1
                className="
                  text-5xl
                  font-black
                "
              >
                {tournament.name}
              </h1>

              <p
                className="
                  text-cyan-400
                  mt-2
                  font-bold
                "
              >
                Código:
                {" "}
                {tournament.code}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div
            className="
              inline-flex

              px-5
              py-3

              rounded-2xl

              bg-green-500/20

              text-green-400

              font-black
            "
          >
            {tournament.started
              ? "CAMPEONATO AO VIVO"
              : "AGUARDANDO JOGADORES"}
          </div>
        </div>

        {/* WAITING */}
        {!tournament.started && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              bg-white/5

              border
              border-cyan-500/10

              rounded-3xl

              p-8

              backdrop-blur-xl
            "
          >
            <h2
              className="
                text-3xl
                font-black

                mb-6
              "
            >
              Jogadores Inscritos
            </h2>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3

                gap-5
              "
            >
              {tournament.players?.map(
                (player) => (
                  <div
                    key={player.uid}
                    className="
                      bg-slate-900/60

                      border
                      border-white/10

                      rounded-2xl

                      p-5

                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        font-bold
                      "
                    >
                      {
                        player.username
                      }
                    </span>

                    <Crown
                      className="
                        text-yellow-400
                      "
                    />
                  </div>
                )
              )}
            </div>

            <div
              className="
                mt-8

                text-center
              "
            >
              <span
                className="
                  text-2xl
                  font-black

                  text-cyan-400
                "
              >
                {
                  tournament.players
                    ?.length
                }
                /
                {
                  tournament.maxPlayers
                }
              </span>
            </div>
          </motion.div>
        )}

        {/* BRACKET */}
        {tournament.started && (
          <div
            className="
              overflow-x-auto

              pb-10
            "
          >
            <div
              className="
                flex
                gap-20

                min-w-max
              "
            >
              {tournament.rounds?.map(
                (
                  round,
                  roundIndex
                ) => (
                  <div
                    key={roundIndex}
                    className="
                      flex
                      flex-col
                      gap-10
                    "
                  >
                    {/* ROUND TITLE */}
                    <div
                      className="
                        text-center
                      "
                    >
                      <h2
                        className="
                          text-3xl
                          font-black
                        "
                      >
                        {roundIndex ===
                        tournament
                          .rounds
                          .length -
                          1
                          ? "FINAL"
                          : `RODADA ${
                              roundIndex +
                              1
                            }`}
                      </h2>
                    </div>

                    {/* MATCHES */}
                    {round.map(
                      (
                        match,
                        matchIndex
                      ) => (
                        <motion.div
                          key={match.id}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="
                            w-[350px]

                            bg-white/5

                            border
                            border-cyan-500/10

                            rounded-3xl

                            p-5

                            backdrop-blur-xl

                            shadow-[0_0_30px_rgba(0,255,255,0.05)]

                            relative
                          "
                        >
                          {/* PLAYER 1 */}
                          <div
                            className={`
                              flex
                              items-center
                              justify-between

                              p-4

                              rounded-2xl

                              mb-3

                              ${
                                match.winner
                                  ?.uid ===
                                match
                                  .player1
                                  ?.uid
                                  ? `
                                    bg-green-500/20
                                    border
                                    border-green-500/20
                                  `
                                  : `
                                    bg-slate-900/70
                                  `
                              }
                            `}
                          >
                            <span
                              className="
                                font-bold
                              "
                            >
                              {match
                                .player1
                                ?.username ||
                                "Aguardando"}
                            </span>

                            <span
                              className="
                                text-2xl
                                font-black
                              "
                            >
                              {
                                match.score1
                              }
                            </span>
                          </div>

                          {/* PLAYER 2 */}
                          <div
                            className={`
                              flex
                              items-center
                              justify-between

                              p-4

                              rounded-2xl

                              ${
                                match.winner
                                  ?.uid ===
                                match
                                  .player2
                                  ?.uid
                                  ? `
                                    bg-green-500/20
                                    border
                                    border-green-500/20
                                  `
                                  : `
                                    bg-slate-900/70
                                  `
                              }
                            `}
                          >
                            <span
                              className="
                                font-bold
                              "
                            >
                              {match
                                .player2
                                ?.username ||
                                "Aguardando"}
                            </span>

                            <span
                              className="
                                text-2xl
                                font-black
                              "
                            >
                              {
                                match.score2
                              }
                            </span>
                          </div>

                          {/* ADMIN CONTROLS */}
                          {isAdmin &&
                            !match.finished &&
                            match.player1 &&
                            match.player2 && (
                              <>
                                {/* SCORE */}
                                <div
                                  className="
                                    flex
                                    items-center
                                    justify-center

                                    gap-4

                                    mt-6
                                  "
                                >
                                  <input
                                    type="number"
                                    min="0"
                                    value={
                                      scores[
                                        `${match.id}-1`
                                      ] ||
                                      ""
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      setScores(
                                        (
                                          prev
                                        ) => ({
                                          ...prev,
                                          [`${match.id}-1`]:
                                            e
                                              .target
                                              .value,
                                        })
                                      )
                                    }
                                    className="
                                      w-24

                                      bg-slate-900

                                      border
                                      border-white/10

                                      rounded-2xl

                                      p-4

                                      text-center

                                      outline-none
                                    "
                                  />

                                  <Swords
                                    className="
                                      text-cyan-400
                                    "
                                  />

                                  <input
                                    type="number"
                                    min="0"
                                    value={
                                      scores[
                                        `${match.id}-2`
                                      ] ||
                                      ""
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      setScores(
                                        (
                                          prev
                                        ) => ({
                                          ...prev,
                                          [`${match.id}-2`]:
                                            e
                                              .target
                                              .value,
                                        })
                                      )
                                    }
                                    className="
                                      w-24

                                      bg-slate-900

                                      border
                                      border-white/10

                                      rounded-2xl

                                      p-4

                                      text-center

                                      outline-none
                                    "
                                  />
                                </div>

                                {/* FINISH */}
                                <button
                                  onClick={() =>
                                    finishMatch(
                                      roundIndex,
                                      matchIndex
                                    )
                                  }
                                  className="
                                    w-full

                                    mt-6

                                    bg-cyan-500
                                    hover:bg-cyan-400

                                    text-black
                                    font-black

                                    py-4

                                    rounded-2xl

                                    transition-all

                                    cursor-pointer
                                  "
                                >
                                  Finalizar
                                  Partida
                                </button>
                              </>
                            )}

                          {/* WINNER */}
                          {match.finished && (
                            <div
                              className="
                                mt-5

                                bg-green-500/20

                                border
                                border-green-500/20

                                rounded-2xl

                                p-4

                                text-center

                                text-green-400
                                font-black
                              "
                            >
                              Vencedor:
                              {" "}
                              {
                                match.winner
                                  ?.username
                              }
                            </div>
                          )}
                        </motion.div>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* CHAMPION */}
        {tournament.champion && (
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
              fixed
              inset-0

              bg-black/80

              z-[100]

              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                text-center
              "
            >
              <motion.div
                animate={{
                  rotate: [
                    -5,
                    5,
                    -5,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                <Crown
                  size={150}
                  className="
                    mx-auto

                    text-yellow-400

                    drop-shadow-[0_0_40px_gold]
                  "
                />
              </motion.div>

              <h1
                className="
                  text-7xl
                  font-black

                  mt-8

                  text-yellow-400
                "
              >
                CAMPEÃO
              </h1>

              <p
                className="
                  text-5xl
                  font-black

                  mt-5
                "
              >
                {
                  tournament
                    .champion
                    .username
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}