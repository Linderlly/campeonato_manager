import { useEffect, useState } from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../services/firebase"

import Sidebar from "../components/Sidebar"

import {
  Crown,
  Trophy
} from "lucide-react"

export default function Leaderboard() {
  const [players, setPlayers] =
    useState([])

  useEffect(() => {
    async function loadPlayers() {
      const snapshot =
        await getDocs(
          collection(db, "users")
        )

      const data = []

      snapshot.forEach((doc) => {
        data.push(doc.data())
      })

      // ORDENAR
      data.sort(
        (a, b) =>
          b.tournamentsWon -
          a.tournamentsWon
      )

      setPlayers(data)
    }

    loadPlayers()
  }, [])

  return (
    <div
      className="
        min-h-screen
        bg-[#020617]
        text-white
      "
    >
      <Sidebar />

      <div className="lg:ml-[260px] p-6">
        <h1
          className="
            text-5xl
            font-black
            mb-10
          "
        >
          Ranking Global
        </h1>

        <div className="space-y-4">
          {players.map(
            (player, index) => (
              <div
                key={player.uid}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-6
                  "
                >
                  {/* POSIÇÃO */}
                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-cyan-500/20
                      flex
                      items-center
                      justify-center
                      text-2xl
                      font-black
                    "
                  >
                    #{index + 1}
                  </div>

                  {/* USER */}
                  <div>
                    <h2
                      className="
                        text-2xl
                        font-black
                      "
                    >
                      {player.username}
                    </h2>

                    <p className="text-slate-400">
                      {player.wins} vitórias
                    </p>
                  </div>
                </div>

                {/* TROPHIES */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    bg-yellow-500/20
                    px-5
                    py-3
                    rounded-2xl
                  "
                >
                  <Crown
                    className="
                      text-yellow-400
                    "
                  />

                  <span className="font-black">
                    {
                      player.tournamentsWon
                    }
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}