import { Genre, Series } from "@/types";

export const getFilteredSeries = (
  series: Series[],
  selectedCategory: Genre | null,
  query: string
): Series[] => {
  return series.filter((series) => {
    const matchesCategory = selectedCategory
      ? series.genre_ids.includes(selectedCategory.id)
      : true;

    const matchesSearch = series.name.toLowerCase().includes(query.toLowerCase())

    return matchesCategory && matchesSearch;
  });
};

export const getSortedSeries = (
  series: Series[],
  filter: string,
  sortDirection: "asc" | "desc"
): Series[] => {
  return [...series].sort((a, b) => {
    switch (filter) {
      case "latest":
        return (
          new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()
        );
      case "best_advised":
        return b.popularity - a.popularity;
      case "rating":
        return b.vote_average - a.vote_average;
      case "year":
        return sortDirection === "asc"
          ? new Date(a.first_air_date).getFullYear() - new Date(b.first_air_date).getFullYear()
          : new Date(b.first_air_date).getFullYear() - new Date(a.first_air_date).getFullYear();
      case "a-z":
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
};
