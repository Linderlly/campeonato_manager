import {
  collection,
  addDoc
} from "firebase/firestore"

import { db } from "./firebase"

export async function createTournament(data) {
  return await addDoc(
    collection(db, "tournaments"),
    data
  )
}