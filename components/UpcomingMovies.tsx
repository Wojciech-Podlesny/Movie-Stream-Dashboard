"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchHomeContentInitial } from "@/app/store/Media/homeContentSlice";
import { Container } from "@/styles/PopularSeries.styled";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { MovieCarousel } from "@/components/MovieCarousel"; 

const Section = styled.div`
  width: 100%;
   @media (max-width: 768px) {
    display: none;
  }
`;

const Head = styled.div`
  padding: 20px;
  font-size: 23px;
  font-weight: 700;
`;

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
      <Container>
        Loading upcoming movies... <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Section>
      <Container>
        <Head>Upcoming Movies</Head>
        <MovieCarousel movies={upcomingMovies} />
      </Container>
    </Section>
  );
};

