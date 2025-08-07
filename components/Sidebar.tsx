"use client";

import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesSection } from "./CategoriesSection";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CircularProgress } from "@mui/material";
import { fetchCategories } from "@/app/store/Media/categoriesSlice";
import { styled } from "styled-components";
import { MdChevronRight } from "react-icons/md";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";

const CategoriesContainer = styled.div`
  background-color: #121212;
  padding: 30px 20px;
  max-width: 280px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    top: 60px;
  }
`;

const SidebarInner = styled.div`
  min-height: 100vh;
  background: rgba(13, 13, 29, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  overflow-y: auto;
`;

const ToggleButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

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
    return (
      <CategoriesContainer>
        Loading categories <CircularProgress />
      </CategoriesContainer>
    );

  if (error) return <CategoriesContainer>{error}</CategoriesContainer>;

  return (
    <SidebarInner>
      <ToggleButton onClick={onToggle} aria-label={isOpen ? "Zwiń" : "Rozwiń"}>
        {isOpen ? (
          <ArrowBackIosNewIcon fontSize="small"  />
        ) : (
          <MdChevronRight size={24} />
        )}
      </ToggleButton>

      {/* Sekcje widoczne tylko w trybie rozwiniętym */}
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
