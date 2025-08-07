"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CircularProgress } from "@mui/material";
import { getFilteredMovies, getSortedMovies } from "@/utils/filterMovies";
import { MoviesGrid } from "@/components/MoviesGrid";
import { MoviesPagination } from "@/components/MediaPagination";
import { fetchDiscoverMovies } from "../store/Media/discoverSLice";
import { styled } from "styled-components";
import { MediaFilterButtons } from "@/components/MediaFilterButtons";

export const MoviePageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MoviePageSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const MoviePageContainer = styled.div`
  width: 2000px;
  color: #fff;
  background-color: #0d0d2f;
`;

export const MoviePageTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;

export const MovieGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  padding: 20px;
  justify-content: center;
`;

export const MovieCard = styled.div`
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

export const MoviePageMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 20px;
  background-color: #0d0d2f;
  border-radius: 8px;
`;

export const MoviePosterWrapper = styled.div`
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
    totalPagesMovies,
  } = useSelector((state: RootState) => state.discover);

  const { query } = useSelector((state: RootState) => state.search);

  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (discoverMovies.length === 0) {
      dispatch(fetchDiscoverMovies(moviesPage));
    }
  }, [dispatch, discoverMovies.length, moviesPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchDiscoverMovies(value));
  };

  const filteredMovies = getFilteredMovies(discoverMovies, null, query);
  const sortedMovies = getSortedMovies(filteredMovies, filter, sortDirection);

  const safeTotalPages = Math.min(totalPagesMovies, 500);

  return (
    <div>
      <Navbar />

      <MoviePageWrapper>
        <MoviePageSection>
          <MoviePageContainer>
            <MoviePageMenu>
              <MoviePageTitle>Movies</MoviePageTitle>
              <MediaFilterButtons
                sortDirection={sortDirection}
                setFilter={setFilter}
                setSortDirection={setSortDirection}
              />
            </MoviePageMenu>

            {loading && (
              <div style={{ padding: 20, display: "flex", gap: 12, alignItems: "center" }}>
                Loading movies... <CircularProgress size={20} />
              </div>
            )}

            {error && <div style={{ padding: 20 }}>{error}</div>}

            {!loading && !error && (
              <>
                <MoviesGrid movies={sortedMovies} showToggle={false} />
                <MoviesPagination
                  totalPages={safeTotalPages}
                  page={moviesPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </MoviePageContainer>
        </MoviePageSection>
      </MoviePageWrapper>

      <Footer />
    </div>
  );
};

export default Movies;
