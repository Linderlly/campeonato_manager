import {
  createContext,
  useEffect,
  useState,
} from "react"

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

import {
  doc,
  getDoc,
} from "firebase/firestore"

import {
  auth,
  db,
} from "../services/firebase"

export const AuthContext =
  createContext({})

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null)

  const [userData, setUserData] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          if (currentUser) {
            setUser(currentUser)

            const docRef = doc(
              db,
              "users",
              currentUser.uid
            )

            const snapshot =
              await getDoc(docRef)

            if (snapshot.exists()) {
              setUserData(
                snapshot.data()
              )
            }
          } else {
            setUser(null)
            setUserData(null)
          }

          setLoading(false)
        }
      )

    return () => unsubscribe()
  }, [])

  async function logout() {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}