import {
  useEffect,
  useState
} from "react"

import {
  collection,
  onSnapshot,
} from "firebase/firestore"

import {
  useNavigate
} from "react-router-dom"

import {
  motion
} from "framer-motion"

import {
  Trophy,
  Users,
  Swords,
  Crown,
} from "lucide-react"

import Sidebar from "../components/Sidebar"

import {
  db
} from "../services/firebase"

import {
  useAuth
} from "../hooks/useAuth"

export default function MyTournaments() {
  const navigate =
    useNavigate()

  const {
    user,
    userData
  } = useAuth()

  const [tournaments, setTournaments] =
    useState([])

  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        collection(db, "tournaments"),
        (snapshot) => {
          const list = []

          snapshot.forEach((doc) => {
            const data =
              doc.data()

            // USER IN TOURNAMENT
            const isPlayer =
              (
                data.players || []
              ).some(
                (player) =>
                  player.uid ===
                  user?.uid
              )

            // ADMIN VIEW
            if (
              isPlayer ||
              userData?.role ===
                "admin"
            ) {
              list.push({
                id: doc.id,
                ...data,
              })
            }
          })

          setTournaments(list)
        }
      )

    return () => unsubscribe()
  }, [user, userData])

  return (
    <div
      className="
        min-h-screen
        bg-[#020617]
        text-white
      "
    >
      <Sidebar />

      <div
        className="
          lg:ml-[260px]
          p-6
        "
      >
        {/* HEADER */}
        <div className="mb-10">
          <h1
            className="
              text-5xl
              font-black
            "
          >
            Meus Campeonatos
          </h1>

          <p
            className="
              text-slate-400
              mt-3
            "
          >
            Veja todos os
            campeonatos ativos
          </p>
        </div>

        {/* EMPTY */}
        {tournaments.length ===
          0 && (
          <div
            className="
              bg-white/5

              border
              border-white/10

              rounded-3xl

              p-10

              text-center
            "
          >
            <Trophy
              size={60}
              className="
                mx-auto
                text-cyan-400
                mb-6
              "
            />

            <h2
              className="
                text-3xl
                font-black
                mb-3
              "
            >
              Nenhum campeonato
            </h2>

            <p className="text-slate-400">
              Você ainda não
              participa de nenhum
              campeonato
            </p>
          </div>
        )}

        {/* TOURNAMENTS */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >
          {tournaments.map(
            (tournament) => (
              <motion.div
                key={tournament.id}
                whileHover={{
                  scale: 1.02,
                }}
                onClick={() =>
                  navigate(
                    `/tournament/${tournament.id}`
                  )
                }
                className="
                  bg-white/5

                  border
                  border-white/10

                  rounded-3xl

                  p-6

                  backdrop-blur-xl

                  cursor-pointer

                  transition-all

                  hover:border-cyan-500/30

                  hover:shadow-[0_0_25px_rgba(0,255,255,0.12)]
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
                    <h2
                      className="
                        text-3xl
                        font-black
                      "
                    >
                      {
                        tournament.name
                      }
                    </h2>

                    <p
                      className="
                        text-cyan-400
                        mt-2
                        font-bold
                      "
                    >
                      {
                        tournament.code
                      }
                    </p>
                  </div>

                  <div
                    className={`
                      px-4
                      py-2

                      rounded-2xl

                      font-bold

                      ${
                        tournament.started
                          ? `
                            bg-green-500/20
                            text-green-400
                          `
                          : `
                            bg-yellow-500/20
                            text-yellow-400
                          `
                      }
                    `}
                  >
                    {tournament.started
                      ? "AO VIVO"
                      : "AGUARDANDO"}
                  </div>
                </div>

                {/* STATS */}
                <div
                  className="
                    grid
                    grid-cols-3
                    gap-4

                    mb-8
                  "
                >
                  {/* PLAYERS */}
                  <div
                    className="
                      bg-slate-900/60

                      rounded-2xl

                      p-4
                    "
                  >
                    <Users
                      className="
                        text-cyan-400
                        mb-3
                      "
                    />

                    <p
                      className="
                        text-slate-400
                        text-sm
                      "
                    >
                      Jogadores
                    </p>

                    <h3
                      className="
                        text-2xl
                        font-black
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
                    </h3>
                  </div>

                  {/* MATCHES */}
                  <div
                    className="
                      bg-slate-900/60

                      rounded-2xl

                      p-4
                    "
                  >
                    <Swords
                      className="
                        text-blue-400
                        mb-3
                      "
                    />

                    <p
                      className="
                        text-slate-400
                        text-sm
                      "
                    >
                      Rodadas
                    </p>

                    <h3
                      className="
                        text-2xl
                        font-black
                      "
                    >
                      {
                        tournament
                          .rounds
                          ?.length || 0
                      }
                    </h3>
                  </div>

                  {/* CHAMPION */}
                  <div
                    className="
                      bg-slate-900/60

                      rounded-2xl

                      p-4
                    "
                  >
                    <Crown
                      className="
                        text-yellow-400
                        mb-3
                      "
                    />

                    <p
                      className="
                        text-slate-400
                        text-sm
                      "
                    >
                      Campeão
                    </p>

                    <h3
                      className="
                        text-lg
                        font-black
                        truncate
                      "
                    >
                      {tournament.champion
                        ?.username ||
                        "---"}
                    </h3>
                  </div>
                </div>

                {/* FOOTER */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className="
                      text-slate-400
                    "
                  >
                    Clique para abrir
                    o chaveamento
                  </p>

                  <Trophy
                    className="
                      text-cyan-400
                    "
                  />
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  )
}