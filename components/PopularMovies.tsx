import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store/store";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getFilteredMovies, getSortedMovies } from "@/utils/filterMovies";
import { MediaFilterBar } from "./MediaFilterBar";
import { MoviesGrid } from "./MoviesGrid";
import { fetchHomeContentInitial } from "@/app/store/Media/homeContentSlice";

import { styled } from "styled-components";

export const Container = styled.div`  //to other files
  width: 100%;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;


  @media (max-width: 480px) {
    padding: 0 6px;
  }
`;


export const PopularMovies = () => {
  const { error, loading, popularMovies } = useSelector((state: RootState) => state.home);
  const { selectedMovieCategory } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useSelector((state: RootState) => state.search);
  const [showAllMovies, setShowAllMovies] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");


  useEffect(() => {
    dispatch(fetchHomeContentInitial());
  }, [dispatch]);

  const filteredMovies = getFilteredMovies(popularMovies, selectedMovieCategory, query);
  const sortedMovies = getSortedMovies(filteredMovies, filter, sortDirection);

  // const displayMoreMovies = showAllMovies
  //   ? sortedMovies
  //   : sortedMovies.slice(0, 5);

  if (loading)
    return (
      <Container>
        {" "}
        Loading... <CircularProgress />{" "}
      </Container>
    );

  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <MediaFilterBar
        filter={filter}
        sortDirection={sortDirection}
        setFilter={setFilter}
        setSortDirection={setSortDirection}
        showAll={showAllMovies}
        toggleShowAll={() => setShowAllMovies((prev) => !prev)}
      />
      <MoviesGrid movies={sortedMovies} />
    
    </Container>
  );
};

