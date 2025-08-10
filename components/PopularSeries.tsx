'use client';

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store/store";
import { useEffect, useMemo, useState, useCallback } from "react";
import { MediaFilterBar } from "./MediaFilterBar";
import { fetchHomeContentInitial } from "@/app/store/Media/homeContentSlice";
import { MediaHeaderTitle } from "./MediaHeaderTitle";
import { PopularMediaWrapper } from "@/styles/MediaPopularWrapper.styled";
import { ErrorState, LoadingState } from "@/utils/renderStates";
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import ClearIcon from '@mui/icons-material/Clear';
import {MobileFilterToggle,HeaderWithFilter,} from "@/styles/MediaFilterBar.styled";
import FiltersDrawer from "./MobileFilterDrawer";
import { getFilteredSeries, getSortedSeries } from "@/utils/filterSeries";
import { SeriesGrid } from "./SeriesGrid";

export const PopularSeries = () => {
  const { error, loading, popularSeries } = useSelector((s: RootState) => s.home);
  const { selectedMovieCategory } = useSelector((s: RootState) => s.categories);
  const { query } = useSelector((s: RootState) => s.search);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHomeContentInitial());
  }, [dispatch]);

  const filteredSeries = useMemo(
    () => getFilteredSeries(popularSeries, selectedMovieCategory, query),
    [popularSeries, selectedMovieCategory, query]
  );

  const sortedSeries = useMemo(
    () => getSortedSeries(filteredSeries, filter, sortDirection),
    [filteredSeries, filter, sortDirection]
  );

  const toggleFilters = useCallback(() => setIsFiltersOpen(v => !v), []);
  const closeFilters = useCallback(() => setIsFiltersOpen(false), []);

  if (loading) return <LoadingState message="Loading series" />;
  if (error) return <ErrorState message={error} />;

  return (
    <PopularMediaWrapper>
      <HeaderWithFilter>
        <MediaHeaderTitle type="series" />
        <MobileFilterToggle
          aria-expanded={isFiltersOpen}
          onClick={toggleFilters}
        >
          {isFiltersOpen ? <ClearIcon fontSize="medium" /> : <FilterListAltIcon fontSize="medium" />}
        </MobileFilterToggle>
      </HeaderWithFilter>


      <MediaFilterBar
        sortDirection={sortDirection}
        setFilter={setFilter}
        setSortDirection={setSortDirection}
      />

      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={closeFilters}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        setFilter={setFilter}
      />

      <SeriesGrid series={sortedSeries} />
    </PopularMediaWrapper>
  );
};
