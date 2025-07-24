"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CircularProgress } from "@mui/material";
import { getFilteredMovies, getSortedMovies } from "@/utils/filterMovies";
import { MoviesFilterMenu } from "@/components/MediaFilterMenu";
import { MoviesGrid } from "@/components/MoviesGrid";
import { MoviesPagination } from "@/components/MediaPagination";
import { fetchDiscoverMovies } from "../store/Media/discoverSLice";
import { styled } from "styled-components";

export const SectionMovies = styled("div")`
  display: flex;
  justify-content: center;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Container = styled.div`
width: 1400px;
  color: #fff;
  background-color: #0d0d2f;
`;



export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  padding: 20px;
  justify-content: center;
`;

export const Card = styled.div`
  background-color: #0d0d2f;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.3);
  }
`;

export const SectionMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 20px;
  background-color: #0d0d2f;
  border-radius: 8px;
`;

export const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;
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
