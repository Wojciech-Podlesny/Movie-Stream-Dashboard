import { db } from "@/lib/firebase/firebase";
import { doc, setDoc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { Movie } from "@/types/models";

export const addToFavourites = async (userId: string, movie: Movie) => {
  console.log("ZAPISYWANIE do Firestore:", userId, movie);
  await setDoc(doc(db, "users", userId, "favourites", movie.id.toString()), movie);
};

export const removeFromFavourites = async (userId: string, movieId: number) => {
  await deleteDoc(doc(db, "users", userId, "favourites", movieId.toString()));
};

export const subscribeToFavourites = (
  userId: string,
  onUpdate: (data: Movie[]) => void
) => {
  console.log("Subskrypcja Firestore dla:", userId);
  return onSnapshot(
    collection(db, "users", userId, "favourites"),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as Movie);
      console.log('Odebrane ulubione z Firestore:", data');
      onUpdate(data);
    }
  );
};
