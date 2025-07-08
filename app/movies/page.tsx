"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Container } from "@/styles/PopularSeries.styled";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CircularProgress } from "@mui/material";
import { getFilteredMovies, getSortedMovies } from "@/utils/filterMovies";
import { MoviesFilterMenu } from "@/components/MediaFilterMenu";
import { MoviesGrid } from "@/components/MoviesGrid";
import { MoviesPagination } from "@/components/MediaPagination";
import { fetchDiscoverMovies } from "../store/Media/discoverSLice";
import { Section, SectionMovies } from "@/styles/MoviesDetails.styled";


const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    discoverMovies,
    loading,
    error,
    moviesPage,
    selectedCategory,
  } = useSelector((state: RootState) => state.discover);
  const { query } = useSelector((state: RootState) => state.search);

  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    dispatch(fetchDiscoverMovies(moviesPage));
  }, [dispatch, moviesPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchDiscoverMovies(value));
  };

  const filteredMovies = getFilteredMovies(discoverMovies, selectedCategory, query);
  const sortedMovies = getSortedMovies(filteredMovies, filter, sortDirection);

  if (loading) return <Container>Loading movies... <CircularProgress /></Container>;
  if (error) return <Container>{error}</Container>;

  
  return (
    <div>
      <Navbar />
      <SectionMovies>
        <Section>
          <Container>
            <MoviesFilterMenu setFilter={setFilter} setSortDirection={setSortDirection} />
            <MoviesGrid movies={sortedMovies} />
            <MoviesPagination
              totalPages={10}
              page={moviesPage}
              onPageChange={handlePageChange}
            />
          </Container>
        </Section>
      </SectionMovies>
      <Footer />
    </div>
  );
};

export default Movies;
