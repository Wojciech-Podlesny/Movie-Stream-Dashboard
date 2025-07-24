"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircularProgress } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { fetchSeriesDetails, resetSeriesDetails } from "@/app/store/Media/detailsSeriesSlice";
import { MoviesTrailer } from "@/components/MediaTrailer";
import { MoviesHeader } from "@/components/MoviesHeader";
import { styled } from "styled-components";


export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;
  padding: 0 10px;

  @media (max-width: 480px) {
    padding: 0 6px;
  }
`;

// export const SectionMovies = styled("div")`
//   display: flex;
//   justify-content: center;
// `;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const COnt = styled.div`
  display: flex;
  justify-content: center;
`;

export const DetailsLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin: 20px 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MovieInfo = styled.div`
  max-width: 600px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
`;

export const PosterWrapper = styled.div`
  flex-shrink: 0;
  padding-left: 80px;
`;

export const TrailerWrapper = styled.div`
  margin-top: 40px;
`;

export const Title1 = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: white;
  display: flex;
  gap: 10px;
`;
export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: normal;
  color: white;
  display: flex;
  gap: 10px;
`;

export const SectionTitleOverview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 40px;
`;



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
