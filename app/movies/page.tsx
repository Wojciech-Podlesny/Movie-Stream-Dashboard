"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { fetchDiscoverMovies } from "../store/Media/discoverSLice";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { MediaFilterBar } from "@/components/MediaFilterBar";
import { MediaHeaderTitle } from "@/components/MediaHeaderTitle";
import FiltersDrawer from "@/components/MobileFilterDrawer";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import { getFilteredMovies, getSortedMovies } from "@/utils/filterMovies";
import { MoviesGrid } from "@/components/MoviesGrid";
import { MediaPagination } from "@/components/MediaPagination";
import { DesktopSectionFavouritesList, HeaderWithFilter, MediaWrapper, MobileOnlyToggle, SectionMain, SectionMedia, SectionMediaDetails } from "@/styles/MediaPage.styled";


const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { discoverMovies, moviesPage, totalPagesMovies } = useSelector((s: RootState) => s.discover);
  const { query } = useSelector((state: RootState) => state.search);
  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = useCallback(() => setIsFiltersOpen(v => !v), []);
  const closeFilters = useCallback(() => setIsFiltersOpen(false), []);

  useEffect(() => {
    if (discoverMovies.length === 0) {
      dispatch(fetchDiscoverMovies(moviesPage));
    }
  }, [dispatch, discoverMovies.length, moviesPage]);


  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(fetchDiscoverMovies(value));
  };

  const filteredMovies = getFilteredMovies(discoverMovies, null, query);
  const sortedMovies = getSortedMovies(filteredMovies, filter, sortDirection);
  const safeTotalPages = Math.min(totalPagesMovies, 500);



  return (
    <>
      <Navbar />
      <SectionMediaDetails leftCol={sidebarOpen ? 250 : 60}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(p => !p)} />
        <SectionMedia>
          <SectionMain>
            <MediaWrapper>
              <HeaderWithFilter>
                <MediaHeaderTitle type="movies" />
                <MobileOnlyToggle
                  aria-label="Pokaż filtry"
                  aria-haspopup="dialog"
                  aria-expanded={isFiltersOpen}
                  onClick={toggleFilters}
                >
                  {isFiltersOpen ? (
                    <ClearIcon fontSize="medium" />
                  ) : (
                    <FilterListAltIcon fontSize="medium" />
                  )}
                </MobileOnlyToggle>
              </HeaderWithFilter>

              <MediaFilterBar
                sortDirection={sortDirection}
                setFilter={setFilter}
                setSortDirection={setSortDirection}
              />


              <MoviesGrid movies={sortedMovies} showToggle={false} />

              <MediaPagination
                totalPages={safeTotalPages}
                page={moviesPage}
                onPageChange={handlePageChange}
              />


              <FiltersDrawer
                isOpen={isFiltersOpen}
                onClose={closeFilters}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                setFilter={setFilter}
              />
            </MediaWrapper>
          </SectionMain>
        </SectionMedia>
        <DesktopSectionFavouritesList>
          <FavouritesList />
        </DesktopSectionFavouritesList>
      </SectionMediaDetails>
      <Footer />
    </>
  );
};

export default Movies;