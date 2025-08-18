"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { fetchDiscoverSeries } from "../store/Media/discoverSLice";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { MediaFilterBar } from "@/components/MediaFilterBar";
import { MediaHeaderTitle } from "@/components/MediaHeaderTitle";
import FiltersDrawer from "@/components/MobileFilterDrawer";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import { MediaPagination } from "@/components/MediaPagination";
import { getFilteredSeries, getSortedSeries } from "@/utils/filterSeries";
import { SeriesGrid } from "@/components/SeriesGrid";
import { DesktopSectionFavouritesList, HeaderWithFilter, MediaWrapper, MobileOnlyToggle, SectionMain, SectionMedia, SectionMediaDetails } from "@/styles/MediaPage.styled";


const Series = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { discoverSeries, seriesPage, totalPagesSeries } = useSelector((s: RootState) => s.discover);
  const { query } = useSelector((state: RootState) => state.search);
  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = useCallback(() => setIsFiltersOpen(v => !v), []);
  const closeFilters = useCallback(() => setIsFiltersOpen(false), []);

  useEffect(() => {
    if (discoverSeries.length === 0) {
      dispatch(fetchDiscoverSeries(seriesPage));
    }
  }, [dispatch, discoverSeries.length, seriesPage]);


  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchDiscoverSeries(value));
  };

  const filteredSeries = getFilteredSeries(discoverSeries, null, query);
  const sortedSeries = getSortedSeries(filteredSeries, filter, sortDirection);
  const safeTotalPages = Math.min(totalPagesSeries, 500);



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


              <SeriesGrid series={sortedSeries} showToggle={false} />

              <MediaPagination
                totalPages={safeTotalPages}
                page={seriesPage}
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

export default Series;
