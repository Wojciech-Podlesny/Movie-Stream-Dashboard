"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase/firebase"; // Twój klient Firebase

interface FavoriteButtonProps {
  id: string;
  type: "movie" | "series";
  initialFavorite: boolean;
}

export default function FavoriteButton({ id, type, initialFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Zaloguj się, aby dodać do ulubionych");
      return;
    }

    setLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/account/favorites/${type}/${id}`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Błąd API");
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      alert("Wystąpił błąd: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggleFavorite} disabled={loading}>
      {isFavorite ? "💔 Usuń z ulubionych" : "❤️ Dodaj do ulubionych"}
    </button>
  );
}
