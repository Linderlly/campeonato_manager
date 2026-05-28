import { Navigate } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

export default function AdminRoute({
  children
}) {
  const { userData, loading } =
    useAuth()

  if (loading) return null

  if (
    !userData ||
    userData.role !== "admin"
  ) {
    return <Navigate to="/dashboard" />
  }

  return children
}