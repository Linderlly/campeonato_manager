import {
  useEffect,
  useState
} from "react"

import {
  collection,
  onSnapshot,
} from "firebase/firestore"

import {
  Trophy,
  Users,
  Swords,
  Crown,
} from "lucide-react"

import Sidebar from "../components/Sidebar"

import { db } from "../services/firebase"

import { motion } from "framer-motion"

export default function Dashboard() {
  const [tournaments, setTournaments] =
    useState([])

  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        collection(db, "tournaments"),
        (snapshot) => {
          const list = []

          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              ...doc.data(),
            })
          })

          setTournaments(list)
        }
      )

    return () => unsubscribe()
  }, [])

  const totalPlayers =
    tournaments.reduce(
      (acc, item) =>
        acc +
        (item.players?.length || 0),
      0
    )

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
        {/* HERO */}
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
            mb-10

            bg-gradient-to-r
            from-cyan-500/20
            to-blue-500/20

            border
            border-cyan-500/20

            rounded-3xl

            p-10
          "
        >
          <h1
            className="
              text-6xl
              font-black
            "
          >
            FIFA eSports
          </h1>

          <p
            className="
              text-slate-300
              mt-4
              text-xl
            "
          >
            Plataforma profissional de
            campeonatos FIFA/EA FC
          </p>
        </motion.div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-10
          "
        >
          <StatCard
            title="Campeonatos"
            value={tournaments.length}
            icon={<Trophy />}
          />

          <StatCard
            title="Jogadores"
            value={totalPlayers}
            icon={<Users />}
          />

          <StatCard
            title="Partidas"
            value={24}
            icon={<Swords />}
          />

          <StatCard
            title="Campeões"
            value={
              tournaments.filter(
                (t) => t.champion
              ).length
            }
            icon={<Crown />}
          />
        </div>

        {/* TOURNAMENTS */}
        <div>
          <h2
            className="
              text-4xl
              font-black
              mb-8
            "
          >
            Campeonatos Ativos
          </h2>

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
                  className="
                    bg-white/5

                    border
                    border-white/10

                    rounded-3xl

                    p-6

                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-6
                    "
                  >
                    <div>
                      <h3
                        className="
                          text-3xl
                          font-black
                        "
                      >
                        {
                          tournament.name
                        }
                      </h3>

                      <p
                        className="
                          text-cyan-400
                          mt-2
                        "
                      >
                        {
                          tournament.code
                        }
                      </p>
                    </div>

                    <div
                      className="
                        px-4
                        py-2

                        rounded-2xl

                        bg-green-500/20
                        text-green-400

                        font-bold
                      "
                    >
                      AO VIVO
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p className="text-slate-400">
                        Jogadores
                      </p>

                      <h4
                        className="
                          text-4xl
                          font-black
                        "
                      >
                        {
                          tournament.players
                            ?.length
                        }
                      </h4>
                    </div>

                    {tournament.champion && (
                      <div
                        className="
                          text-right
                        "
                      >
                        <p
                          className="
                            text-yellow-400
                          "
                        >
                          Campeão
                        </p>

                        <h4
                          className="
                            text-2xl
                            font-black
                          "
                        >
                          {
                            tournament
                              .champion
                              .username
                          }
                        </h4>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon
}) {
  return (
    <div
      className="
        bg-white/5

        border
        border-white/10

        rounded-3xl

        p-6

        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p className="text-slate-400">
            {title}
          </p>

          <h2
            className="
              text-5xl
              font-black
              mt-3
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
            w-16
            h-16

            rounded-2xl

            bg-cyan-500/20

            flex
            items-center
            justify-center

            text-cyan-400
          "
        >
          {icon}
        </div>
      </div>
    </div>
  )
}