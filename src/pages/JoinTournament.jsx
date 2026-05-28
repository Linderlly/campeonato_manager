import { useState } from "react"

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore"

import {
  motion
} from "framer-motion"

import {
  Ticket,
  Trophy,
  Users,
  Loader2,
} from "lucide-react"

import {
  toast
} from "react-toastify"

import Sidebar from "../components/Sidebar"

import {
  db
} from "../services/firebase"

import {
  useAuth
} from "../hooks/useAuth"

import {
  generateBracket
} from "../utils/generateBracket"

export default function JoinTournament() {
  const {
    user,
    userData,
    loading,
  } = useAuth()

  const [code, setCode] =
    useState("")

  const [joining, setJoining] =
    useState(false)

  async function joinTournament(
    e
  ) {
    e.preventDefault()

    // LOADING USER
    if (loading) {
      toast.error(
        "Carregando usuário..."
      )

      return
    }

    // VALIDATE
    if (!code) {
      toast.error(
        "Digite um código"
      )

      return
    }

    try {
      setJoining(true)

      // SEARCH TOURNAMENT
      const q = query(
        collection(db, "tournaments"),
        where(
          "code",
          "==",
          code.toUpperCase()
        )
      )

      const snapshot =
        await getDocs(q)

      // NOT FOUND
      if (snapshot.empty) {
        toast.error(
          "Campeonato não encontrado"
        )

        return
      }

      // TOURNAMENT DATA
      const tournamentDoc =
        snapshot.docs[0]

      const tournament = {
        id: tournamentDoc.id,
        ...tournamentDoc.data(),
      }

      // TOURNAMENT STARTED
      if (tournament.started) {
        toast.error(
          "Campeonato já iniciado"
        )

        return
      }

      // CHECK DUPLICATE
      const alreadyJoined =
        (
          tournament.players || []
        ).some(
          (player) =>
            player.uid === user.uid
        )

      if (alreadyJoined) {
        toast.error(
          "Você já está no campeonato"
        )

        return
      }

      // LIMIT PLAYERS
      if (
        tournament.players
          ?.length >=
        tournament.maxPlayers
      ) {
        toast.error(
          "Campeonato lotado"
        )

        return
      }

      // NEW PLAYER
      const newPlayer = {
        uid: user.uid,

        username:
          userData?.username ||
          user.email.split("@")[0],

        email: user.email,

        wins: 0,

        losses: 0,

        joinedAt: new Date(),
      }

      // UPDATE PLAYERS
      const updatedPlayers = [
        ...(tournament.players ||
          []),

        newPlayer,
      ]

      // AUTO START
      let rounds = []

      let started = false

      let status = "waiting"

      // IF FULL -> GENERATE BRACKET
      if (
        updatedPlayers.length ===
        tournament.maxPlayers
      ) {
        rounds =
          generateBracket(
            updatedPlayers
          )

        started = true

        status = "active"

        toast.success(
          "Campeonato iniciado automaticamente!"
        )
      }

      // UPDATE FIRESTORE
      await updateDoc(
        doc(
          db,
          "tournaments",
          tournament.id
        ),
        {
          players: updatedPlayers,

          rounds,

          started,

          status,
        }
      )

      toast.success(
        "Você entrou no campeonato!"
      )

      setCode("")
    } catch (error) {
      console.log(error)

      toast.error(
        "Erro ao entrar no campeonato"
      )
    } finally {
      setJoining(false)
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
      <Sidebar />

      <div
        className="
          lg:ml-[260px]

          min-h-screen

          flex
          items-center
          justify-center

          p-6
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            w-full
            max-w-2xl

            bg-white/5

            border
            border-cyan-500/20

            rounded-3xl

            p-10

            backdrop-blur-xl

            shadow-[0_0_40px_rgba(0,255,255,0.08)]
          "
        >
          {/* HEADER */}
          <div className="mb-10">
            <div
              className="
                w-24
                h-24

                rounded-3xl

                bg-cyan-500/20

                flex
                items-center
                justify-center

                mb-6

                shadow-[0_0_25px_rgba(0,255,255,0.2)]
              "
            >
              <Ticket
                size={42}
                className="
                  text-cyan-400
                "
              />
            </div>

            <h1
              className="
                text-5xl
                font-black

                leading-tight
              "
            >
              Entrar no
              Campeonato
            </h1>

            <p
              className="
                text-slate-400
                mt-4
                text-lg
              "
            >
              Use o código fornecido
              pelo administrador para
              participar do torneio
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              joinTournament
            }
          >
            {/* INPUT */}
            <div className="mb-8">
              <label
                className="
                  block
                  mb-4

                  font-bold
                  text-lg
                "
              >
                Código do Campeonato
              </label>

              <input
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="FIFA-AB123"
                className="
                  w-full

                  bg-slate-900/80

                  border
                  border-white/10

                  rounded-2xl

                  p-5

                  text-2xl
                  font-black
                  tracking-widest

                  outline-none

                  focus:border-cyan-400

                  transition-all

                  shadow-inner
                "
              />
            </div>

            {/* INFO */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2

                gap-5

                mb-8
              "
            >
              {/* CARD */}
              <div
                className="
                  bg-white/5

                  border
                  border-white/10

                  rounded-2xl

                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3

                    mb-3
                  "
                >
                  <Users
                    className="
                      text-cyan-400
                    "
                  />

                  <span className="font-bold">
                    Multiplayer
                  </span>
                </div>

                <p className="text-slate-400">
                  Entre em torneios
                  competitivos online
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  bg-white/5

                  border
                  border-white/10

                  rounded-2xl

                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3

                    mb-3
                  "
                >
                  <Trophy
                    className="
                      text-yellow-400
                    "
                  />

                  <span className="font-bold">
                    Ranking
                  </span>
                </div>

                <p className="text-slate-400">
                  Ganhe partidas e suba
                  no ranking global
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={joining}
              className="
                w-full

                bg-cyan-500
                hover:bg-cyan-400

                text-black
                font-black
                text-lg

                py-5

                rounded-2xl

                transition-all
                duration-300

                cursor-pointer

                flex
                items-center
                justify-center
                gap-3

                shadow-[0_0_30px_rgba(0,255,255,0.25)]

                disabled:opacity-50
              "
            >
              {joining ? (
                <>
                  <Loader2
                    className="
                      animate-spin
                    "
                  />

                  Entrando...
                </>
              ) : (
                "Entrar Campeonato"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}