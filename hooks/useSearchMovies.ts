import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "@/types";
import { AppDispatch, RootState } from "@/app/store/store";
import { setSearchQuery } from "@/app/store/Search/searchSlice";

export const useSearchMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies, upcomingMovies, nowPlayingMovies } = useSelector(
    (state: RootState) => state.home
  );

  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    try {
      dispatch(setSearchQuery(debouncedValue));
      setError(null);
    } catch (e) {
      setError(`Error downloading data: ${e}`);
    }
  }, [debouncedValue, dispatch]);

  const allMovies: Movie[] = useMemo(() => {
    const seen = new Set<number>();
    return [...popularMovies, ...upcomingMovies, ...nowPlayingMovies].filter((movie) => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
  }, [popularMovies, upcomingMovies, nowPlayingMovies]);

  const filteredResults = useMemo(() => {
    if (!debouncedValue.trim()) return [];
    return allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(debouncedValue.trim().toLowerCase())
    );
  }, [debouncedValue, allMovies]);

  return {
    value,
    setValue,
    loading,
    error,
    filteredResults
  };
};
