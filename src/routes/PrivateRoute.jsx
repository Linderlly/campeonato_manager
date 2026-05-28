import { Navigate } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

export default function PrivateRoute({
  children
}) {
  const { user, loading } = useAuth()

  if (loading) {
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

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}