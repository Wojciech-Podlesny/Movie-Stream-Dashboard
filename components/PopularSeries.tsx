"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { CircularProgress} from "@mui/material";
import { getFilteredSeries, getSortedSeries } from "@/utils/filterSeries";
import { MediaFilterBar } from "./MediaFilterBar";
import { SeriesGrid } from "./SeriesGrid";
import { fetchHomeContentInitial } from "@/app/store/Media/homeContentSlice";
import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;


  @media (max-width: 480px) {
    padding: 0 6px;
  }
`;


export const PopularSeries = () => {
  const { error, loading, popularSeries } = useSelector((state: RootState) => state.home);
  const { selectedSeriesCategory } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useSelector((state: RootState) => state.search);
  const [showAllSeries, setShowAllSeries] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    dispatch(fetchHomeContentInitial());
  }, [dispatch]);


    const filteredMSeriees = getFilteredSeries(popularSeries, selectedSeriesCategory, query);
    const sortedSeries = getSortedSeries(filteredMSeriees, filter, sortDirection);
  
    if (loading)
      return (
        <Container>
          {" "}
          Loading series <CircularProgress />{" "}
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
           showAll={showAllSeries}
           toggleShowAll={() => setShowAllSeries((prev) => !prev)}
         />

     <SeriesGrid series={sortedSeries} />
    </Container>
  );
};
