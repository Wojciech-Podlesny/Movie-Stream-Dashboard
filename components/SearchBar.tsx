"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  SearchBarWrapper,
  InputWrapper,
  SearchInput,
  SearchIconContainer,
  SearchStatusMessage,
} from "@/styles/SearchBar.styled";

import { SearchDropdownList } from "@/components/SearchDropdown"; // zakładam, że masz to już gotowe
import { Movie } from "@/types";
import { useDropdownNavigation } from "../hooks/useKeyboardNavigation";
import { useSearchMovies } from "../hooks/useSearchMovies";

export const SearchBar = () => {
  const { value, setValue, loading, error, filteredResults } = useSearchMovies();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleResultClick = (movie: Movie) => {
    router.push(`/movies/${movie.id}`);
    setDropdownOpen(false);
    setValue("");
    inputRef.current?.focus();
  };

  const { highlightedIndex, handleKeyDown } = useDropdownNavigation(
    filteredResults,
    handleResultClick
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(value.length > 0 && filteredResults.length > 0);
  }, [value, filteredResults.length]);

  return (
    <SearchBarWrapper ref={containerRef}>
      <InputWrapper>
        <SearchInput
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Movies"
          aria-label="Search movies"
          aria-autocomplete="list"
          aria-controls="search-dropdown"
          tabIndex={0}
        />
        <SearchIconContainer>
          <SearchIcon fontSize="small" />
        </SearchIconContainer>
      </InputWrapper>

      {loading && (
        <SearchStatusMessage>
          <CircularProgress size={18} sx={{ mr: 1, verticalAlign: "middle" }} />
          Loading...
        </SearchStatusMessage>
      )}

      {error && <SearchStatusMessage>{error}</SearchStatusMessage>}

      {dropdownOpen && (
        <SearchDropdownList
          results={filteredResults}
          highlightedIndex={highlightedIndex}
          itemsRef={itemsRef}
          onResultClick={handleResultClick}
        />
      )}

      {value && !loading && filteredResults.length === 0 && !error && (
        <SearchStatusMessage>Not found</SearchStatusMessage>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;



// "use client";

// import {
//   ChangeEvent,
//   useEffect,
//   useState,
//   useMemo,
//   KeyboardEvent,
//   useRef,
// } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../app/store/store";
// import { setSearchQuery } from "../app/store/Search/searchSlice";
// import { Movie } from "@/types";
// import Image from "next/image";
// import SearchIcon from "@mui/icons-material/Search";
// import { useRouter } from "next/navigation";
// import { CircularProgress } from "@mui/material";
// import { SearchBarWrapper, SearchDropdown, SearchDropdownItem, SearchIconContainer, SearchInput, SearchStatusMessage } from "@/styles/SearchBar.styled";


// export const SearchBar = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [value, setValue] = useState<string>("");
//   const { popularMovies, upcomingMovies, nowPlayingMovies } = useSelector((state: RootState) => state.home);
//   const router = useRouter();
//   const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
//   const [debouncedValue, setDebouncedValue] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

//   useEffect(() => {
//     setLoading(true);
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//       setLoading(false);
//     }, 400);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value]);

//   useEffect(() => {
//     try {
//       dispatch(setSearchQuery(debouncedValue));
//       setError(null);
//     } catch (e) {
//       setError(`Error downloading data: ${e}`);
//     }
//   }, [debouncedValue, dispatch]);

//   const allMovies: Movie[] = useMemo(() => {
//     const seen = new Set<number>();
//     return [...popularMovies, ...upcomingMovies, ...nowPlayingMovies].filter((movie) => {
//       if (seen.has(movie.id)) return false;
//       seen.add(movie.id);
//       return true;
//     });
//   }, [popularMovies, upcomingMovies, nowPlayingMovies]);

//   const filteredResults = useMemo(() => {
//     if (!debouncedValue.trim()) return [];
//     return allMovies.filter((movie) =>
//       movie.title.toLowerCase().includes(debouncedValue.trim().toLowerCase())
//     );
//   }, [debouncedValue, allMovies]);

//   useEffect(() => {
//     setHighlightedIndex(-1);
//   }, [filteredResults.length]);

//   useEffect(() => {
//     if (value && filteredResults.length > 0) setDropdownOpen(true);
//     else setDropdownOpen(false);
//   }, [value, filteredResults.length]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (highlightedIndex >= 0 && itemsRef.current[highlightedIndex]) {
//       itemsRef.current[highlightedIndex]?.scrollIntoView({
//         block: "nearest",
//         behavior: "smooth",
//       });
//     }
//   }, [highlightedIndex]);

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//   };

//   const handleResultClick = (movie: Movie) => {
//     router.push(`/movies/${movie.id}`);
//     setDropdownOpen(false);
//     setValue("");
//     setHighlightedIndex(-1);
//     inputRef.current?.focus();
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (!dropdownOpen || filteredResults.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlightedIndex((prev) =>
//         prev < filteredResults.length - 1 ? prev + 1 : 0
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlightedIndex((prev) =>
//         prev > 0 ? prev - 1 : filteredResults.length - 1
//       );
//     } else if (e.key === "Enter" && highlightedIndex >= 0) {
//       e.preventDefault();
//       handleResultClick(filteredResults[highlightedIndex]);
//     } else if (e.key === "Escape") {
//       e.preventDefault();
//       setValue("");
//       setDropdownOpen(false);
//       setHighlightedIndex(-1);
//     }
//   };

//   return (
//     <SearchBarWrapper ref={containerRef}>
//       <SearchInput
//         ref={inputRef}
//         type="text"
//         value={value}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search Movies"
//         aria-label="Search movies"
//         aria-autocomplete="list"
//         aria-controls="search-dropdown"
//         tabIndex={0}
//       />
//       <SearchIconContainer>
//         <SearchIcon />
//       </SearchIconContainer>

//       {loading && (
//         <SearchStatusMessage>
//           <CircularProgress size={18} sx={{ mr: 1 }} />
//           Loading...
//         </SearchStatusMessage>
//       )}
//       {error && <SearchStatusMessage>{error}</SearchStatusMessage>}

//       {dropdownOpen && (
//         <SearchDropdown role="listbox" id="search-dropdown">
//           {filteredResults.map((movie, index) => (
//             <SearchDropdownItem
//               ref={(el) => {
//                 itemsRef.current[index] = el;
//               }}
//               id={`search-item-${index}`}
//               role="option"
//               aria-selected={index === highlightedIndex}
//               key={movie.id}
//               onClick={() => handleResultClick(movie)}
//               style={{
//                 background: index === highlightedIndex ? "#e6f0ff" : undefined,
//               }}
//             >
//               {movie.poster_path && (
//                 <Image
//                   src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
//                   alt={movie.title}
//                   width={40}
//                   height={60}
//                   style={{
//                     objectFit: "cover",
//                     borderRadius: "6px",
//                     marginRight: "12px",
//                   }}
//                 />
//               )}
//               <span>
//                 {movie.title}{" "}
//                 {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
//               </span>
//             </SearchDropdownItem>
//           ))}
//         </SearchDropdown>
//       )}

//       {value && !loading && filteredResults.length === 0 && !error && (
//         <SearchStatusMessage>Not found</SearchStatusMessage>
//       )}
//     </SearchBarWrapper>
//   );
// };
