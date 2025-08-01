"use client";

import { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSession } from "next-auth/react";
import { showErrorToast } from "./ErrorToast";
import { FavoriteButtonProps } from "@/types/favourites";



export const FavouritesButton = ({ itemId, type, data }: FavoriteButtonProps) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user?.idToken) return;

      try {
        const responseAccount = await fetch("/api/account/favourites", {
          headers: {
            Authorization: `Bearer ${session.user.idToken}`,
          },
        });

        if (!responseAccount.ok) throw new Error("Failed to fetch favorites");
        const favorites: Array<{ itemId: string }> = await responseAccount.json();

        const found = favorites.some(
          (fav) => fav.itemId === itemId
        );

        setIsFavorite(found);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    fetchFavorites();
  }, [session?.user?.idToken, itemId]);

  const handleToggleFavorite = async () => {
    if (!session?.user?.idToken) return showErrorToast("You must be logged in.");
    setLoading(true);

    try {
      const responseFavourites = await fetch("/api/account/favourites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.idToken}`,
        },
        body: JSON.stringify({ itemId, type, data }),
      });

      if (!responseFavourites.ok) {
        const { error } = await responseFavourites.json();
        throw new Error(error || "Unknown error");
      }

      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      showErrorToast("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title={isFavorite ? "Add to favourites" : "Delete from favourites"}>
      <Button
        onClick={handleToggleFavorite}
        disabled={loading}
        color={isFavorite ? "error" : "primary"}
        sx={{
          minWidth: "auto",
          padding: "6px",
          borderRadius: "50%",
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Button>
    </Tooltip>
  );
};
