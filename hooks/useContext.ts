import { MovieContext } from "@/context/context"
import { useContext } from "react";


export const useMovies = () => {
    const context = useContext(MovieContext);
    if (!context) {
      throw new Error("useMovies musi być używane wewnątrz TMDBProvider");
    }
    return context;
  };