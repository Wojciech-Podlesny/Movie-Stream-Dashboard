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
import { MediaFilterButtons } from "@/components/MediaFilterButtons";
import { styled } from "styled-components";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { SectionMediaDetails } from "@/styles/MediaDetailsPage.styled";

const MediaPageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MediaPageSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MediaPageContainer = styled.div`
  width: 2000px;
  color: #fff;
  background-color: #0d0d2f;
`;

export const MediaPageTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;

 const MediaPageMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 20px;
  background-color: #0d0d2f;
  border-radius: 8px;
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
  const [sidebarOpen,setSidebarOpen] = useState<boolean>(true)

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
    <>
      <Navbar />
      <SectionMediaDetails leftCol={sidebarOpen ? 250 : 60}>
        <Sidebar
                  isOpen={sidebarOpen}
                  onToggle={() => setSidebarOpen((prev) => !prev)}
                />
                <MediaPageWrapper>
        <MediaPageSection>
          <MediaPageContainer>
            <MediaPageMenu>
              <MediaPageTitle>Movies</MediaPageTitle>
              <MediaFilterButtons
                sortDirection={sortDirection}
                setFilter={setFilter}
                setSortDirection={setSortDirection}
              />
            </MediaPageMenu>

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
          </MediaPageContainer>
        </MediaPageSection>
      </MediaPageWrapper>
      <FavouritesList />
      </SectionMediaDetails>

      

      <Footer />
    </>
  );
};

export default Movies;
