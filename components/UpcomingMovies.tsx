"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchHomeContentInitial } from "@/app/store/Media/homeContentSlice";
import { CircularProgress } from "@mui/material";
import { MovieCarousel } from "@/components/MovieCarousel";
import {
  StyledSection,
  StyledSectionContainer,
  StyledSectionHeading,
} from "@/styles/MovieSection.styled";

export const UpcomingMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, upcomingMovies } = useSelector(
    (state: RootState) => state.home
  );

  useEffect(() => {
    dispatch(fetchHomeContentInitial());
  }, [dispatch]);

  if (loading) {
    return (
      <StyledSection>
        <StyledSectionContainer>
        <CircularProgress />
        </StyledSectionContainer>
      </StyledSection>
    );
  }

  if (error) {
    return (
      <StyledSection>
        <StyledSectionContainer>{error}</StyledSectionContainer>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <StyledSectionContainer>
        <StyledSectionHeading>Upcoming Movies</StyledSectionHeading>
        <MovieCarousel movies={upcomingMovies} />
      </StyledSectionContainer>
    </StyledSection>
  );
};
