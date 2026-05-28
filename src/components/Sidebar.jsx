import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Shield,
  Trophy,
  PlusCircle,
  LogOut,
  Ticket,
  Crown,
} from "lucide-react";

import { motion } from "framer-motion";

import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const location = useLocation();

  const { logout, userData } = useAuth();

  const isAdmin = userData?.role === "admin";

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      title: "Meus Campeonatos",
      icon: Trophy,
      path: "/my-tournaments",
    },

    {
      title: "Entrar Campeonato",
      icon: Ticket,
      path: "/join",
    },
  ];

  return (
    <aside
      className="
    fixed
    top-0
    left-0

    w-[260px]
    h-screen

    bg-[#020617]/95

    border-r
    border-cyan-500/10

    backdrop-blur-2xl

    z-50

    hidden
    lg:flex
    flex-col

    overflow-y-auto

    scrollbar-thin
    scrollbar-thumb-cyan-500/20
    scrollbar-track-transparent
  "
    >
      {/* LOGO */}
      <div
        className="
          p-6

          border-b
          border-white/5
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              w-14
              h-14

              rounded-2xl

              bg-cyan-500/20

              flex
              items-center
              justify-center

              shadow-[0_0_25px_rgba(0,255,255,0.15)]
            "
          >
            <Crown
              className="
                text-cyan-400
              "
              size={28}
            />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-black
                text-white
              "
            >
              FIFA HUB
            </h1>

            <p
              className="
                text-slate-400
                text-sm
              "
            >
              eSports Platform
            </p>
          </div>
        </motion.div>
      </div>

      {/* USER */}
      <div className="p-6">
        <div
          className="
            bg-white/5

            border
            border-white/10

            rounded-3xl

            p-5
          "
        >
          <p
            className="
              text-slate-400
              text-sm
            "
          >
            Conectado como
          </p>

          <h2
            className="
              text-xl
              font-black
              mt-2
            "
          >
            {userData?.username || "Usuário"}
          </h2>

          <div
            className="
              mt-4

              inline-flex

              px-4
              py-2

              rounded-2xl

              text-sm
              font-bold

              bg-cyan-500/20
              text-cyan-400
            "
          >
            {isAdmin ? "Administrador" : "Jogador"}
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav
        className="
          flex-1
          px-4
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
          "
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`
                      flex
                      items-center
                      gap-4

                      px-5
                      py-4

                      rounded-2xl

                      transition-all
                      duration-300

                      ${
                        active
                          ? `
                            bg-cyan-500/15
                            border
                            border-cyan-500/20

                            text-cyan-400

                            shadow-[0_0_20px_rgba(0,255,255,0.08)]
                          `
                          : `
                            text-slate-300

                            hover:bg-white/5
                          `
                      }
                    `}
                >
                  <Icon size={22} />

                  <span
                    className="
                        font-semibold
                      "
                  >
                    {item.title}
                  </span>
                </motion.div>
              </Link>
            );
          })}

          {/* ADMIN */}
          {isAdmin && (
            <Link to="/admin">
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`
                  flex
                  items-center
                  gap-4

                  px-5
                  py-4

                  rounded-2xl

                  transition-all
                  duration-300

                  ${
                    location.pathname === "/admin"
                      ? `
                        bg-purple-500/15
                        border
                        border-purple-500/20

                        text-purple-400
                      `
                      : `
                        text-slate-300

                        hover:bg-white/5
                      `
                  }
                `}
              >
                <Shield size={22} />

                <span
                  className="
                    font-semibold
                  "
                >
                  Painel Admin
                </span>
              </motion.div>
            </Link>
          )}
        </div>
      </nav>

      {/* CREATE */}
      <div className="p-4">
        <Link to="/join">
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              bg-gradient-to-r
              from-cyan-500
              to-blue-500

              rounded-2xl

              p-5

              flex
              items-center
              gap-4

              text-black
              font-black

              shadow-[0_0_30px_rgba(0,255,255,0.2)]
            "
          >
            <PlusCircle size={24} />
            Entrar em Campeonato
          </motion.div>
        </Link>
      </div>

      {/* LOGOUT */}
      <div
        className="
          p-4

          border-t
          border-white/5
        "
      >
        <button
          onClick={logout}
          className="
            w-full

            flex
            items-center
            justify-center
            gap-3

            bg-red-500/10
            hover:bg-red-500/20

            border
            border-red-500/20

            text-red-400
            font-bold

            py-4

            rounded-2xl

            transition-all

            cursor-pointer
          "
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}
