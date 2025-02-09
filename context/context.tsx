'use client'

import { createContext, ReactNode, useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type Series = {
  id: number;
  name: string;
  poster_path: string;
};

type Genre = {
  id: number;
  name: string;
};

type MoviesContextType = {
  movies: Movie[];
  series: Series[];
  genres: Genre[];
  tvGenres: Genre[];
  loading: boolean;
  error: string | null;
};

type Props = {
    children: ReactNode
}

export const MovieContext = createContext<MoviesContextType | undefined>(undefined);

export const MovieContextProvider = ({ children }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movies, series, genres, tvGenres] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-EN`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-EN`
          ),
          fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-EN`
          ),
          fetch(
            `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-EN`
          )
        ]);

        if (!movies.ok || !series.ok || !genres.ok || !tvGenres.ok) {
          throw new Error("Failed to fetch data");
        }

        const [moviesData, seriesData, genresData, tvGenresData] = await Promise.all([
          movies.json(),
          series.json(),
          genres.json(),
          tvGenres.json()
        ]);

        setMovies(moviesData.results);
        setSeries(seriesData.results);
        setGenres(genresData.genres);
        setTvGenres(tvGenresData.genres);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 
  //Dodanie funkcji pobierania szczegółów filmu , następnie stworzenie komponentu MovieDetails i przekierowania na MovieList i SeriesList do szczegółow filmów
  //Dodatkowy error.tsx na errorboundry i loading




  return (
    <MovieContext.Provider value={{ movies, series, genres, tvGenres, loading, error }}>
        {children}
    </MovieContext.Provider>
  );
};
