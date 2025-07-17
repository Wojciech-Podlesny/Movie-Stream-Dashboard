"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircularProgress, styled } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import {Section, TrailerWrapper,} from "@/styles/MoviesDetails.styled";
import { Container } from "@/styles/PopularMovies.styled";
import { fetchSeriesDetails, resetSeriesDetails } from "@/app/store/Media/detailsSeriesSlice";
import { MoviesTrailer } from "@/components/MediaTrailer";
import { MoviesHeader } from "@/components/MoviesHeader";


const SectionMovies = styled("div")`
  display: flex;
  justify-content: center;
`;


const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const { series, loading, error } = useSelector((state: RootState) => state.seriesDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchSeriesDetails({ seriesId: id }));
    }

    return () => {
      dispatch(resetSeriesDetails());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container>
        <Navbar />
        Loading details movies... <CircularProgress />
        <Footer />
      </Container>
    );
  }

  if (error || !series) {
    return (
      <Container>
        <Navbar />
        <p>{error || "Not found details movies..."}</p>
        <Footer />
      </Container>
    );
  }
  return (
    <>
      <Navbar />
      <SectionMovies>
        <Sidebar />
        <Section>
          <Container>
            <MoviesHeader
              posterPath={series.poster_path}
              title={series.name}
              releaseDate={series.first_air_date}
              voteAverage={series.vote_average}
              overview={series.overview} id={0}            />
            <TrailerWrapper>
              <MoviesTrailer movieTitle={series.name} />
            </TrailerWrapper>
          </Container>
          <FavouritesList />
        </Section>
      </SectionMovies>
      <Footer />
    </>
  );
};

export default SeriesDetails;
