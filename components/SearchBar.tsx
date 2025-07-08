"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
  KeyboardEvent,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store/store";
import { setSearchQuery } from "../app/store/Search/searchSlice";
import { Movie } from "@/types";
import Image from "next/image";
import { styled } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";


const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1.5px solid #ccc;
  border-radius: 20px;
  font-size: 15px;
  outline: none;
  background-color: #fff;

  &:focus {
    border-color: #007aff;
    box-shadow: 0 0 5px rgba(0, 122, 255, 0.3);
  }

  &::placeholder {
    color: #999;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0 0 12px 12px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  font-size: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background-color: #f0f8ff;
  }

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 40px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 12px;
  }

  span {
    font-weight: 500;
    color: #333;
  }
`;

const Message = styled.div`
  padding: 10px;
  color: #666;
  font-size: 14px;
`;

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState<string>("");
  const { popularMovies, upcomingMovies, nowPlayingMovies } = useSelector((state: RootState) => state.home);
  const router = useRouter();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    try {
      dispatch(setSearchQuery(debouncedValue));
      setError(null);
    } catch (e) {
      setError(`Error download data: ${e}`);
    }
  }, [debouncedValue, dispatch]);

  const allMovies: Movie[] = useMemo(() => {
    const seen = new Set<number>();
    return [...popularMovies, ...upcomingMovies, ...nowPlayingMovies].filter(
      (movie) => {
        if (seen.has(movie.id)) return false;
        seen.add(movie.id);
        return true;
      }
    );
  }, [popularMovies, upcomingMovies, nowPlayingMovies]);

  const filteredResults = useMemo(() => {
    if (!debouncedValue.trim()) return [];
    return allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(debouncedValue.trim().toLowerCase())
    );
  }, [debouncedValue, allMovies]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredResults.length]);

  useEffect(() => {
    if (value && filteredResults.length > 0) setDropdownOpen(true);
    else setDropdownOpen(false);
  }, [value, filteredResults.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      itemsRef.current[highlightedIndex]
    ) {
      itemsRef.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleResultClick = (movie: Movie) => {
    router.push(`/movies/${movie.id}`);
    setDropdownOpen(false);
    setValue("");
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (!dropdownOpen || filteredResults.length === 0) return;

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
    handleResultClick(filteredResults[highlightedIndex]);
  } else if (e.key === "Escape") {
    e.preventDefault();
    setValue("");
    setDropdownOpen(false);
    setHighlightedIndex(-1);
  }
};


  return (
    <Container ref={containerRef}>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Movies"
        aria-label="Search movies"
        aria-autocomplete="list"
        aria-controls="search-dropdown"
        tabIndex={0}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      {loading && (
        <Message>
          <CircularProgress size={18} sx={{ mr: 1 }} />
          Loading...
        </Message>
      )}
      {error && <Message>{error}</Message>}

      {dropdownOpen && (
        <Dropdown role="listbox" id="search-dropdown">
          {filteredResults.map((movie, index) => (
            <DropdownItem
              ref={(el) => { itemsRef.current[index] = el; }}
              id={`search-item-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
              key={movie.id}
              onClick={() => handleResultClick(movie)}
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
                  }}
                />
              )}
              <span>
                {movie.title}{" "}
                {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
              </span>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
      {value && !loading && filteredResults.length === 0 && !error && (
        <Message>Not found</Message>
      )}
    </Container>
  );
};








// "use client";

// import {
//   ChangeEvent,
//   KeyboardEvent,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../app/store/store";
// import { setSearchQuery } from "../app/store/Search/searchSlice";
// import { Movie } from "@/types";
// import Image from "next/image";
// import { styled } from "styled-components";
// import SearchIcon from "@mui/icons-material/Search";
// import { useRouter } from "next/navigation";
// import { CircularProgress } from "@mui/material";
// import { showErrorToast } from "./ErrorToast"; // musisz mieć funkcję toastu

// const Container = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 400px;
//   margin: 0 auto;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px 40px 10px 15px;
//   border: 1.5px solid #ccc;
//   border-radius: 20px;
//   font-size: 15px;
//   outline: none;
//   background-color: #fff;

//   &:focus {
//     border-color: #007aff;
//     box-shadow: 0 0 5px rgba(0, 122, 255, 0.3);
//   }

//   &::placeholder {
//     color: #999;
//   }
// `;

// const SearchIconWrapper = styled.div`
//   position: absolute;
//   right: 12px;
//   top: 50%;
//   transform: translateY(-50%);
//   pointer-events: none;
//   color: #666;
// `;

// const Dropdown = styled.ul`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   right: 0;
//   background: #fff;
//   border: 1px solid #ddd;
//   border-radius: 0 0 12px 12px;
//   max-height: 300px;
//   overflow-y: auto;
//   z-index: 10;
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
// `;

// const DropdownItem = styled.li`
//   display: flex;
//   align-items: center;
//   padding: 10px 14px;
//   font-size: 15px;
//   border-bottom: 1px solid #f0f0f0;
//   cursor: pointer;
//   transition: background 0.25s ease;

//   &:hover {
//     background-color: #f0f8ff;
//   }

//   &:last-child {
//     border-bottom: none;
//   }

//   span {
//     font-weight: 500;
//     color: #333;
//   }
// `;

// const Message = styled.div`
//   padding: 10px;
//   color: #666;
//   font-size: 14px;
// `;

// export const SearchBar = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [value, setValue] = useState("");
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

//   const { popularMovies, upcomingMovies, nowPlayingMovies } = useSelector(
//     (state: RootState) => state.home
//   );
//   const router = useRouter();

//   const allMovies: Movie[] = useMemo(() => {
//     const seen = new Set<number>();
//     return [...popularMovies, ...upcomingMovies, ...nowPlayingMovies].filter(
//       (movie) => {
//         if (seen.has(movie.id)) return false;
//         seen.add(movie.id);
//         return true;
//       }
//     );
//   }, [popularMovies, upcomingMovies, nowPlayingMovies]);

//   const filteredResults = useMemo(() => {
//     if (!value.trim()) return [];
//     return allMovies.filter((movie) =>
//       movie.title.toLowerCase().includes(value.trim().toLowerCase())
//     );
//   }, [value, allMovies]);

//   // Debounce + dispatch
//   useEffect(() => {
//     if (!value.trim()) {
//       setDropdownOpen(false);
//       return;
//     }

//     setLoading(true);
//     const timeout = setTimeout(() => {
//       try {
//         dispatch(setSearchQuery(value));
//       } catch (err) {
//         showErrorToast(`Search error: ${String(err)}`);
//       } finally {
//         setLoading(false);
//       }
//     }, 400);

//     return () => clearTimeout(timeout);
//   }, [value, dispatch]);

//   // Reset index + toggle dropdown
//   useEffect(() => {
//     setHighlightedIndex(-1);
//     setDropdownOpen(value.trim() !== "" && filteredResults.length > 0);
//   }, [filteredResults, value]);

//   // Click outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Scroll to selected item
//   useEffect(() => {
//     if (highlightedIndex >= 0) {
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
//     <Container ref={containerRef}>
//       <Input
//         ref={inputRef}
//         value={value}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search Movies"
//         aria-label="Search movies"
//         aria-autocomplete="list"
//         aria-controls="search-dropdown"
//         tabIndex={0}
//       />
//       <SearchIconWrapper>
//         <SearchIcon />
//       </SearchIconWrapper>

//       {loading && (
//         <Message>
//           <CircularProgress size={18} sx={{ mr: 1 }} />
//           Loading...
//         </Message>
//       )}

//       {dropdownOpen && (
//         <Dropdown role="listbox" id="search-dropdown">
//           {filteredResults.map((movie, index) => (
//             <DropdownItem
//               key={movie.id}
//               ref={(el) => { itemsRef.current[index] = el; }}
//               id={`search-item-${index}`}
//               role="option"
//               aria-selected={index === highlightedIndex}
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
//             </DropdownItem>
//           ))}
//         </Dropdown>
//       )}

//       {value && !loading && filteredResults.length === 0 && (
//         <Message>Not found</Message>
//       )}
//     </Container>
//   );
// };
