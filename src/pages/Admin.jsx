import { useState } from "react"

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"

import {
  Trophy,
  Plus,
} from "lucide-react"

import {
  motion
} from "framer-motion"

import {
  toast
} from "react-toastify"

import Sidebar from "../components/Sidebar"

import {
  db
} from "../services/firebase"

import {
  generateTournamentCode
} from "../utils/generateTournamentCode"

export default function Admin() {
  const [name, setName] =
    useState("")

  const [maxPlayers, setMaxPlayers] =
    useState(8)

  const [loading, setLoading] =
    useState(false)

  async function createTournament(
    e
  ) {
    e.preventDefault()

    if (!name) {
      toast.error(
        "Digite o nome"
      )

      return
    }

    try {
      setLoading(true)

      await addDoc(
        collection(db, "tournaments"),
        {
          name,

          code:
            generateTournamentCode(),

          maxPlayers,

          players: [],

          rounds: [],

          champion: null,

          started: false,

          status: "waiting",

          createdAt:
            serverTimestamp(),
        }
      )

      toast.success(
        "Campeonato criado!"
      )

      setName("")
    } catch (error) {
      console.log(error)

      toast.error(
        "Erro ao criar"
      )
    } finally {
      setLoading(false)
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
          p-6
        "
      >
        <motion.form
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          onSubmit={createTournament}
          className="
            bg-white/5

            border
            border-cyan-500/20

            rounded-3xl

            p-8

            backdrop-blur-xl
          "
        >
          <div className="mb-8">
            <h1
              className="
                text-5xl
                font-black
              "
            >
              Criar Campeonato
            </h1>

            <p
              className="
                text-slate-400
                mt-3
              "
            >
              Sistema profissional
              estilo FIFA eSports
            </p>
          </div>

          {/* NAME */}
          <div className="mb-6">
            <label
              className="
                block
                mb-3
                font-bold
              "
            >
              Nome Campeonato
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="
                w-full

                bg-slate-900/70

                border
                border-white/10

                rounded-2xl

                p-4

                outline-none
              "
            />
          </div>

          {/* PLAYERS */}
          <div className="mb-8">
            <label
              className="
                block
                mb-3
                font-bold
              "
            >
              Quantidade Jogadores
            </label>

            <select
              value={maxPlayers}
              onChange={(e) =>
                setMaxPlayers(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                w-full

                bg-slate-900/70

                border
                border-white/10

                rounded-2xl

                p-4

                outline-none
              "
            >
              <option value={4}>
                4 Jogadores
              </option>

              <option value={8}>
                8 Jogadores
              </option>

              <option value={16}>
                16 Jogadores
              </option>

              <option value={32}>
                32 Jogadores
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
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
            "
          >
            {loading
              ? "Criando..."
              : "Criar Campeonato"}
          </button>
        </motion.form>
      </div>
    </div>
  )
}