import { useEffect, useState } from "react"

import {
  doc,
  getDoc
} from "firebase/firestore"

import { db } from "../services/firebase"

import { useAuth } from "../hooks/useAuth"

import Sidebar from "../components/Sidebar"

import {
  Trophy,
  Swords,
  ShieldX,
  Percent,
  Crown
} from "lucide-react"

export default function Profile() {
  const { user } = useAuth()

  const [profile, setProfile] =
    useState(null)

  useEffect(() => {
    async function loadUser() {
      const docRef = doc(
        db,
        "users",
        user.uid
      )

      const snapshot =
        await getDoc(docRef)

      setProfile(snapshot.data())
    }

    loadUser()
  }, [user])

  if (!profile) {
    return (
      <div
        className="
          min-h-screen
          bg-[#020617]
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            w-16
            h-16
            border-4
            border-cyan-400
            border-t-transparent
            rounded-full
            animate-spin
          "
        />
      </div>
    )
  }

  const totalGames =
    profile.wins + profile.losses

  const winRate =
    totalGames > 0
      ? (
          (profile.wins /
            totalGames) *
          100
        ).toFixed(0)
      : 0

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
        {/* HEADER */}
        <div
          className="
            bg-white/5
            border
            border-cyan-500/20
            rounded-3xl
            p-8
            mb-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-6
            "
          >
            {/* AVATAR */}
            <div
              className="
                w-32
                h-32
                rounded-full
                bg-cyan-500/20
                border-4
                border-cyan-400
                flex
                items-center
                justify-center
                text-5xl
                font-black
              "
            >
              {profile.username
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h1
                className="
                  text-5xl
                  font-black
                "
              >
                {profile.username}
              </h1>

              <p className="text-slate-400 mt-2">
                {profile.email}
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-5
            gap-6
          "
        >
          <StatCard
            title="Vitórias"
            value={profile.wins}
            icon={<Trophy />}
            color="green"
          />

          <StatCard
            title="Derrotas"
            value={profile.losses}
            icon={<ShieldX />}
            color="red"
          />

          <StatCard
            title="Win Rate"
            value={`${winRate}%`}
            icon={<Percent />}
            color="cyan"
          />

          <StatCard
            title="Campeonatos"
            value={
              profile.tournamentsPlayed
            }
            icon={<Swords />}
            color="purple"
          />

          <StatCard
            title="Títulos"
            value={
              profile.tournamentsWon
            }
            icon={<Crown />}
            color="yellow"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color
}) {
  const colors = {
    green:
      "bg-green-500/20 text-green-400",

    red:
      "bg-red-500/20 text-red-400",

    cyan:
      "bg-cyan-500/20 text-cyan-400",

    purple:
      "bg-purple-500/20 text-purple-400",

    yellow:
      "bg-yellow-500/20 text-yellow-400",
  }

  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
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
              mt-2
            "
          >
            {value}
          </h2>
        </div>

        <div
          className={`
            p-4
            rounded-2xl
            ${colors[color]}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}