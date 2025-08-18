"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MediaTrailer } from "@/components/MediaTrailer";
import {
  fetchMoviesDetails,
  resetMoviesDetails,
} from "@/app/store/Media/detailsMoviesSlice";
import { ErrorState, LoadingState } from "@/utils/renderStates";
import { CommentForm } from "@/components/CommentForm";
import { MoviesDetailsSection } from "@/components/MoviesDetailsSection";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { DesktopSectionFavouritesList, MediaWrapper, SectionMain, SectionMedia, SectionMediaDetails, TrailerContainer } from "@/styles/MediaDetailsPage.styled";



const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector(
    (state: RootState) => state.moviesDetails
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchMoviesDetails({ movieId: id }));
    }
    return () => {
      dispatch(resetMoviesDetails());
    };
  }, [dispatch, id]);

  if (loading) return <LoadingState message="Loading" />;
  if (error || !movie) return <ErrorState message={error} />;

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
            <MediaWrapper>
              <MoviesDetailsSection
                posterPath={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                id={movie.id}
              />

              <TrailerContainer>
                <MediaTrailer movieTitle={movie.title} />
              </TrailerContainer>

              <CommentForm itemId={id} type="movie" />
            </MediaWrapper>
          </SectionMain>
        </SectionMedia>

        <DesktopSectionFavouritesList>
          <FavouritesList />
        </DesktopSectionFavouritesList>
      </SectionMediaDetails>
      <Footer />
    </>
  );
};

export default MovieDetails;
