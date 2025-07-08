"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Container } from "@/styles/PopularSeries.styled";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { MoviesFilterMenu } from "@/components/MediaFilterMenu";
import { MoviesPagination } from "@/components/MediaPagination";
import { getFilteredSeries, getSortedSeries } from "@/utils/filterSeries";
import { SeriesGrid } from "@/components/SeriesGrid";
import { fetchDiscoverSeries } from "../store/Media/discoverSLice";

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SectionSeries = styled.div`
  display: flex;
  justify-content: center;
`;

const Series = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading,error,discoverSeries,seriesPage,selectedCategory} = useSelector((state: RootState) => state.discover);
  const { query } = useSelector((state: RootState) => state.search);
  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchDiscoverSeries(page));
  }, [dispatch, page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filtered = getFilteredSeries(discoverSeries, selectedCategory, query);
  const sorted = getSortedSeries(filtered, filter, sortDirection);

  if (loading) {
    return (
      <Container>
        Loading series... <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <>
      <Navbar />
      <SectionSeries>
        <Sidebar />
        <Section>
          <Container>
            <MoviesFilterMenu setFilter={setFilter} setSortDirection={setSortDirection} />
            <SeriesGrid series={sorted} />
            <MoviesPagination
              totalPages={10}
              page={seriesPage}
              onPageChange={handlePageChange}
            />
          </Container>
          <FavouritesList />
        </Section>
      </SectionSeries>
      <Footer />
    </>
  );
};

export default Series;
