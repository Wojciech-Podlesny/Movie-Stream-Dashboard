"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchHomeContentInitial } from "@/app/store/Media/homeContentSlice";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { MovieCarousel } from "./MovieCarousel";

const Section = styled.div`
 border-bottom: 1px solid white;
 @media (max-width: 768px) {
    display: none;
  }

`;
const Container = styled.div`
  width: 400px;
  background-color: #0d0d2f;
 

  @media (min-width: 768px) {
    width: 1400px;
  }
`;

const Heading = styled.div`
  padding: 20px;
  font-size: 23px;
  font-weight: 700;
  color: white;
`;

export const NowPlayingMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, nowPlayingMovies } = useSelector(
    (state: RootState) => state.home
  );

  useEffect(() => {
    dispatch(fetchHomeContentInitial());
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        Loading now playing movies... <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    // <Section>
    //   <Head>Now Playing Movies</Head>
    //   <MovieCarousel movies={nowPlayingMovies} />
    // </Section>
    <Section>
      <Container>
        <Heading>Now Playing Movies</Heading>
        <MovieCarousel movies={nowPlayingMovies} />
      </Container>
    </Section>
  );
};
