import Confetti from "react-confetti"

export default function Champion() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Confetti />

      <h1 className="text-6xl font-bold text-yellow-400">
        CAMPEÃO
      </h1>

      <div className="mt-10 text-4xl">
        Neymar Jr
      </div>
    </div>
  )
}