import React from "react";
import Image from "next/image";
import { Movie } from "@/types";
import {
  SearchDropdown,
  SearchDropdownItem,
} from "@/styles/SearchBar.styled";

type SearchBarProps = {
  results: Movie[];
  highlightedIndex: number;
  itemsRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  onResultClick: (movie: Movie) => void;
};

export const SearchDropdownList = ({
  results,
  highlightedIndex,
  itemsRef,
  onResultClick,
}: SearchBarProps) => {
  return (
    <SearchDropdown role="listbox" id="search-dropdown">
      {results.map((movie, index) => (
        <SearchDropdownItem
          ref={(el): void => {
            itemsRef.current[index] = el;
          }}
          id={`search-item-${index}`}
          role="option"
          aria-selected={index === highlightedIndex}
          key={movie.id}
          onClick={() => onResultClick(movie)}
          style={{
            background: index === highlightedIndex ? "#e6f0ff" : undefined,
          }}
        >
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              alt={movie.title}
              width={40}
              height={60}
              style={{
                objectFit: "cover",
                borderRadius: "6px",
                marginRight: "12px",
                flexShrink: 0,
              }}
            />
          )}
          <span>
            {movie.title}{" "}
            {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
          </span>
        </SearchDropdownItem>
      ))}
    </SearchDropdown>
  );
};
