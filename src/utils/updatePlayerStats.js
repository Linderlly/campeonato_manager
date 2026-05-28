import {
doc,
getDoc,
updateDoc
} from "firebase/firestore"
import { db } from "../services/firebase"
export async function updatePlayerStats({
winnerId,
loserId,
championId,
}) {
// WINNER
if (winnerId) {
const winnerRef = doc(
db,
"users",
winnerId
)
12
const winnerSnap =
await getDoc(winnerRef)
const winnerData =
winnerSnap.data()
await updateDoc(winnerRef, {
wins:
(winnerData.wins || 0) + 1,
})
}
// LOSER
if (loserId) {
const loserRef = doc(
db,
"users",
loserId
)
const loserSnap =
await getDoc(loserRef)
const loserData =
loserSnap.data()
await updateDoc(loserRef, {
losses:
(loserData.losses || 0) + 1,
})
}
// CHAMPION
if (championId) {
const championRef = doc(
db,
"users",
championId
)
const championSnap =
await getDoc(championRef)
const championData =
championSnap.data()
await updateDoc(championRef, {
tournamentsWon:
(championData.tournamentsWon || 0) + 1,
})
13
}
}
