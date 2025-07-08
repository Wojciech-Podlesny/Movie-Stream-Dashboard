import { Genre, Movie } from "@/types";

export const getFilteredMovies = (
  movies: Movie[],
  selectedCategory: Genre | null,
  query: string
): Movie[] => {
  return movies.filter((movie) => {
    const matchesCategory = selectedCategory
      ? movie.genre_ids.includes(selectedCategory.id)
      : true;

    const matchesSearch = movie.title.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });
};

export const getSortedMovies = (
  movies: Movie[],
  filter: string,
  sortDirection: "asc" | "desc"
): Movie[] => {
  return [...movies].sort((a, b) => {
    switch (filter) {
      case "latest":
        return (
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
        );
      case "best_advised":
        return b.popularity - a.popularity;
      case "rating":
        return b.vote_average - a.vote_average;
      case "year":
        return sortDirection === "asc"
          ? new Date(a.release_date).getFullYear() - new Date(b.release_date).getFullYear()
          : new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear();
      case "a-z":
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
};
