"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getFilteredMovies, getSortedMovies } from "@/utils/filterMovies";
import { MoviesGrid } from "@/components/MoviesGrid";
import { MoviesPagination } from "@/components/MediaPagination";
import { fetchDiscoverMovies } from "../store/Media/discoverSLice";
import { MediaFilterButtons } from "@/components/MediaFilterButtons";

import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { SectionMediaDetails } from "@/styles/MediaDetailsPage.styled";
import { MediaPageContainer, MediaPageMenu, MediaPageSection, MediaPageTitle, MediaPageWrapper } from "@/styles/MediaPage.styled";
import { ErrorState, LoadingState } from "@/utils/renderStates";

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
               <LoadingState message="Loading Movies" />
              
            )}

            {error && <ErrorState message={error} />}

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

