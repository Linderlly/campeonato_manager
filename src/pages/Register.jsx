import { useState } from "react"

import {
  createUserWithEmailAndPassword
} from "firebase/auth"

import {
  doc,
  setDoc
} from "firebase/firestore"

import {
  useNavigate,
  Link
} from "react-router-dom"

import {
  auth,
  db
} from "../services/firebase"

import {
  toast
} from "react-toastify"

export default function Register() {
  const navigate = useNavigate()

  const [username, setUsername] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function handleRegister(
    e
  ) {
    e.preventDefault()

    if (
      !username ||
      !email ||
      !password
    ) {
      toast.error(
        "Preencha todos os campos"
      )

      return
    }

    try {
      setLoading(true)

      // AUTH
      const response =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

      const user = response.user

      // FIRESTORE
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,

          username,

          email,

          role: "player",

          wins: 0,

          losses: 0,

          tournamentsWon: 0,

          tournamentsPlayed: 0,

          createdAt:
            new Date(),
        }
      )

      toast.success(
        "Conta criada!"
      )

      navigate("/dashboard")
    } catch (error) {
      console.log(error)

      // FIREBASE ERRORS
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error(
            "Email já cadastrado"
          )
          break

        case "auth/weak-password":
          toast.error(
            "Senha muito fraca"
          )
          break

        case "auth/invalid-email":
          toast.error(
            "Email inválido"
          )
          break

        default:
          toast.error(
            "Erro ao criar conta"
          )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#020617]

        flex
        items-center
        justify-center

        p-6
      "
    >
      <form
        onSubmit={handleRegister}
        className="
          w-full
          max-w-md

          bg-white/5

          border
          border-cyan-500/20

          rounded-3xl

          p-8

          backdrop-blur-xl
        "
      >
        <h1
          className="
            text-5xl
            font-black
            text-white

            mb-8
          "
        >
          Cadastro
        </h1>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
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

            text-white

            outline-none

            mb-4
          "
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
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

            text-white

            outline-none

            mb-4
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(
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

            text-white

            outline-none

            mb-6
          "
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full

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
          {loading
            ? "Criando..."
            : "Criar Conta"}
        </button>

        <p
          className="
            text-slate-400
            mt-6
            text-center
          "
        >
          Já possui conta?

          <Link
            to="/"
            className="
              text-cyan-400
              ml-2
            "
          >
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}