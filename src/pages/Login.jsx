import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";

import { Trophy, Mail, Lock } from "lucide-react";

import { motion } from "framer-motion";

import { toast } from "react-toastify";

import { auth } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha email e senha");

      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login realizado!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Email inválido");
          break;

        case "auth/user-not-found":
          toast.error("Usuário não encontrado");
          break;

        case "auth/wrong-password":
          toast.error("Senha incorreta");
          break;

        case "auth/invalid-credential":
          toast.error("Credenciais inválidas");
          break;

        default:
          toast.error("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#020617]
        px-4
        relative
        overflow-hidden
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          bg-cyan-500/20
          blur-[120px]
          rounded-full
          top-[-100px]
          left-[-100px]
        "
      />

      <div
        className="
          absolute
          w-[400px]
          h-[400px]
          bg-blue-500/20
          blur-[120px]
          rounded-full
          bottom-[-100px]
          right-[-100px]
        "
      />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-[0_0_50px_rgba(0,255,255,0.1)]
        "
      >
        {/* LOGO */}
        <div className="text-center mb-8">
          <div
            className="
              w-20
              h-20
              bg-cyan-500/20
              rounded-3xl
              flex
              items-center
              justify-center
              mx-auto
              mb-5
              shadow-[0_0_30px_rgba(0,255,255,0.3)]
            "
          >
            <Trophy size={40} className="text-cyan-400" />
          </div>

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >
            FIFA eSports
          </h1>

          <p className="text-slate-400 mt-3">
            Plataforma profissional de campeonatos
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-slate-400">Email</label>

            <div
              className="
                mt-2
                flex
                items-center
                gap-3
                bg-slate-900/70
                border
                border-white/10
                rounded-2xl
                px-4
                py-3
                focus-within:border-cyan-400
              "
            >
              <Mail className="text-cyan-400" />

              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  bg-transparent
                  outline-none
                  text-white
                  w-full
                "
              />
            </div>
          </div>

          {/* SENHA */}
          <div>
            <label className="text-slate-400">Senha</label>

            <div
              className="
                mt-2
                flex
                items-center
                gap-3
                bg-slate-900/70
                border
                border-white/10
                rounded-2xl
                px-4
                py-3
                focus-within:border-cyan-400
              "
            >
              <Lock className="text-cyan-400" />

              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  bg-transparent
                  outline-none
                  text-white
                  w-full
                "
              />
            </div>
          </div>

          {/* BOTÃO */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-400
              transition-all
              duration-300
              py-4
              rounded-2xl
              font-black
              text-black
              shadow-[0_0_25px_rgba(0,255,255,0.4)]
              cursor-pointer
            "
          >
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>
        </form>

        {/* REGISTER */}
        <div className="mt-6 text-center">
          <p className="text-slate-400">Não possui conta?</p>

          <Link
            to="/register"
            className="
              text-cyan-400
              hover:text-cyan-300
              font-bold
              transition-all
            "
          >
            Criar conta
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
