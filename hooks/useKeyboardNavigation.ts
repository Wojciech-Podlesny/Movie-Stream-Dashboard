import { useEffect, useState } from "react";
import { Movie } from "@/types";

export const useDropdownNavigation = (
  filteredResults: Movie[],
  onSelect: (movie: Movie) => void
) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredResults.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      onSelect(filteredResults[highlightedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setHighlightedIndex(-1);
    }
  };

  return { highlightedIndex, handleKeyDown };
};
