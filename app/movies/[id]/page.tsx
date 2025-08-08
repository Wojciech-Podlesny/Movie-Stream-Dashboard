"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoviesTrailer } from "@/components/MediaTrailer";
import {
  fetchMoviesDetails,
  resetMoviesDetails,
} from "@/app/store/Media/detailsMoviesSlice";
import { ErrorState, LoadingState } from "@/utils/renderStates";
import { styled } from "styled-components";
import { CommentForm } from "@/components/CommentForm";
import { MoviesDetailsSection } from "@/components/MoviesDetailsSection";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";


const SectionMedia = styled("div")`
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

export const MediaContainer = styled.div`
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

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector((state: RootState) => state.moviesDetails);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchMoviesDetails({ movieId: id }));
    }
    return () => {
      dispatch(resetMoviesDetails());
    };
  }, [dispatch, id]);

  if (loading) return <LoadingState message="Loading" />
  if (error || !movie) return <ErrorState message={error} />
  
  return (
    <>
      <Navbar />
      <SectionMediaDetails leftCol={sidebarOpen ? 250 : 60}>
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <SectionMedia>
          <SectionMain>
            <MediaContainer>
              <MoviesDetailsSection
                posterPath={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                id={movie.id}
              />
              <TrailerContainer>
                <MoviesTrailer movieTitle={movie.title} />
              </TrailerContainer>
              <CommentForm itemId={id} type="movie" />
            </MediaContainer>
          </SectionMain>
        </SectionMedia>
        <FavouritesList />
      </SectionMediaDetails>
      <Footer />
    </>
  );
};

export default MovieDetails;
