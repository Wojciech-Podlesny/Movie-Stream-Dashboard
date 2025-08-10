"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MoviesPagination } from "@/components/MediaPagination";
import { fetchDiscoverSeries } from "../store/Media/discoverSLice";
import { MediaFilterButtons } from "@/components/MediaFilterButtons";
import { getFilteredSeries, getSortedSeries } from "@/utils/filterSeries";
import { SeriesGrid } from "@/components/SeriesGrid";
import { SectionMediaDetails } from "@/styles/MediaDetailsPage.styled";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { MediaPageContainer, MediaPageMenu, MediaPageSection, MediaPageTitle, MediaPageWrapper } from "@/styles/MediaPage.styled";
import { ErrorState, LoadingState } from "@/utils/renderStates";

const Series = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    discoverSeries,
    loading,
    error,
    seriesPage,
    totalPagesSeries,
  } = useSelector((state: RootState) => state.discover);

  const { query } = useSelector((state: RootState) => state.search);
  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

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
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <MediaPageWrapper>
          <MediaPageSection>
            <MediaPageContainer>
              <MediaPageMenu>
                <MediaPageTitle>Series</MediaPageTitle>
                <MediaFilterButtons
                  sortDirection={sortDirection}
                  setFilter={setFilter}
                  setSortDirection={setSortDirection}
                />
              </MediaPageMenu>

              {loading && (
                <LoadingState message="Loading Series" />
              )}

              {error && <ErrorState message={error} />}

              {!loading && !error && (
                <>
                  <SeriesGrid series={sortedSeries} showToggle={false} />
                  <MoviesPagination
                    totalPages={safeTotalPages}
                    page={seriesPage}
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
  )


};
export default Series;
