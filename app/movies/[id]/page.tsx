"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MoviesTrailer } from "@/components/MediaTrailer";
import { Container } from "@/styles/PopularMovies.styled";
import { MoviesHeader } from "@/components/MoviesHeader";
import {
  fetchMoviesDetails,
  resetMoviesDetails,
} from "@/app/store/Media/detailsMoviesSlice";
import { renderError, renderLoading } from "@/utils/renderError";
import { styled } from "styled-components";
import { CommentForm } from "@/components/CommentForm";

const SectionMovies = styled("div")`
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TrailerWrapper = styled.div`
  margin-top: 40px;
`;

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector(
    (state: RootState) => state.moviesDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMoviesDetails({ movieId: id }));
    }

    return () => {
      dispatch(resetMoviesDetails());
    };
  }, [dispatch, id]);

  if (loading) return renderLoading();
  if (error || !movie) return renderError(error);

  return (
    <>
      <Navbar />
      <SectionMovies>
        <Section>
          <Container>
            <MoviesHeader
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              id={movie.id}
            />
            <TrailerWrapper>
              <MoviesTrailer movieTitle={movie.title} />
            </TrailerWrapper>
            <CommentForm itemId={id} type="movie" />
          </Container>
        </Section>
      </SectionMovies>
      <Footer />
    </>
  );
};

export default MovieDetails;
