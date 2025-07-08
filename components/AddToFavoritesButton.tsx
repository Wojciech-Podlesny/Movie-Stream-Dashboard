"use client";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { addFavorite, removeFavorite } from "@/app/store/Media/favouritesSlice";


type Movie = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
};

type Props = {
  movie: Movie;
};

export const AddToFavoritesButton = ({ movie }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favourites.items);

  const isFavorite = favorites.some((m) => m.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };
  // useCallback

  return (
    <Button
      variant={isFavorite ? "outlined" : "contained"}
      color="primary"
      onClick={toggleFavorite}
    >
      {isFavorite ? "Remove from favourites" : "Add to favourites"}
    </Button>
  );
};


