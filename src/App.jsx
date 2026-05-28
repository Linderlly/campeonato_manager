import {
  Routes,
  Route
} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Tournament from "./pages/Tournament"
import Admin from "./pages/Admin"
import JoinTournament from "./pages/JoinTournament"
import Profile from "./pages/Profile"
import Leaderboard from "./pages/Leaderboard"
import MyTournaments from "./pages/MyTournaments"

import AdminRoute from "./routes/AdminRoute"
import PrivateRoute from "./routes/PrivateRoute"

export default function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      {/* TOURNAMENT */}
      <Route
        path="/tournament/:id"
        element={
          <PrivateRoute>
            <Tournament />
          </PrivateRoute>
        }
      />

      {/* JOIN */}
      <Route
        path="/join"
        element={
          <PrivateRoute>
            <JoinTournament />
          </PrivateRoute>
        }
      />

      {/* PROFILE */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* LEADERBOARD */}
      <Route
        path="/leaderboard"
        element={
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        }
      />

      {/* MY TOURNAMENTS */}
      <Route
        path="/my-tournaments"
        element={
          <PrivateRoute>
            <MyTournaments />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}