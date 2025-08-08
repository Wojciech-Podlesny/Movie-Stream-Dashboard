"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { fetchSeriesDetails, resetSeriesDetails } from "@/app/store/Media/detailsSeriesSlice";
import { MoviesTrailer } from "@/components/MediaTrailer";
import { styled } from "styled-components";
import { ErrorState, LoadingState } from "@/utils/renderStates";
import { MoviesDetailsSection } from "@/components/MoviesDetailsSection";
import { CommentForm } from "@/components/CommentForm";


const SectionMedia = styled.div`
  display: flex;
  justify-content: center;
`;

const SectionMain = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TrailerContainer = styled.div`
  margin-top: 40px;
`;

const MediaContainer = styled.div`
  width: 100%;
  max-width: 1700px;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;
  padding: 0 10px;

  @media (max-width: 480px) {
    padding: 0 6px;
  }
`;

const SectionMediaDetails = styled.div<{ leftCol?: number }>`
  display: grid;
  grid-template-columns: ${({ leftCol = 250 }) => `${leftCol}px 1fr 250px`};
  grid-template-areas: "left content right";
  flex: 1;
  min-height: 100vh;
  transition: grid-template-columns 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: "content";
  }
`;



const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { series, loading, error } = useSelector((state: RootState) => state.seriesDetails);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchSeriesDetails({ seriesId: id }));
    }
    return () => {
      dispatch(resetSeriesDetails());
    };
  }, [dispatch, id]);

  if (loading) return <LoadingState message="Loading" />;
  if (error || !series) return <ErrorState message={error} />;

  return (
    <>
      <Navbar />
      <SectionMediaDetails leftCol={sidebarOpen ? 250 : 60}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />
        <SectionMedia>
          <SectionMain>
            <MediaContainer>
              <MoviesDetailsSection
                posterPath={series.poster_path}
                title={series.name}
                releaseDate={series.first_air_date}
                voteAverage={series.vote_average}
                overview={series.overview}
                id={series.id}
              />
              <TrailerContainer>
                <MoviesTrailer movieTitle={series.name} />
              </TrailerContainer>
              <CommentForm itemId={id} type="series" />
            </MediaContainer>
          </SectionMain>
        </SectionMedia>
        <FavouritesList />
      </SectionMediaDetails>
      <Footer />
    </>
  );
};

export default SeriesDetails;
