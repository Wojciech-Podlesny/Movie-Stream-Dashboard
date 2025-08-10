"use client";

import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesSection } from "./CategoriesSection";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { fetchCategories } from "@/app/store/Media/categoriesSlice";
import { MdChevronRight } from "react-icons/md";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import { ErrorState, LoadingState } from "@/utils/renderStates";
import { SidebarInner, ToggleButton } from "@/styles/Sidebar.styled";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [openFilms, setOpenFilms] = useState(true);
  const [openSeries, setOpenSeries] = useState(false);
  const { seriesCategories, moviesCategories, error, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  if (loading)
    return <LoadingState message="Loading sidebar" />

  if (error) return <ErrorState message={error} />
 
  return (
    <SidebarInner>
      <ToggleButton onClick={onToggle} aria-label={isOpen ? "Zwiń" : "Rozwiń"}>
        {isOpen ? (
          <ArrowBackIosNewIcon fontSize="small"  />
        ) : (
          <MdChevronRight size={24} />
        )}
      </ToggleButton>

      {isOpen && (
        
        <>
          <CategoriesSection
            title="Movies"
            icon={MovieIcon}
            categories={moviesCategories}
            isOpen={openFilms}
            setIsOpen={setOpenFilms}
            type="movie"
          />

          <CategoriesSection
            title="Series"
            icon={TvIcon}
            categories={seriesCategories}
            isOpen={openSeries}
            setIsOpen={setOpenSeries}
            type="series"
          />
        
        </>
      )}
    </SidebarInner>
  );
};
