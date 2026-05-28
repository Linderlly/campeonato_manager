import { motion } from "framer-motion"

export default function BracketCard({ match }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
        bg-white/10
        backdrop-blur-lg
        border border-cyan-500/30
        rounded-2xl
        p-4
        min-w-[250px]
      "
    >
      <div className="space-y-2">
        <div className="bg-slate-800 p-2 rounded">
          {match.player1}
        </div>

        <div className="bg-slate-800 p-2 rounded">
          {match.player2}
        </div>
      </div>
    </motion.div>
  )
}