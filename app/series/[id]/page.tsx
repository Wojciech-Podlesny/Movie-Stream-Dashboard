'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Description, Info, Poster, PosterWrapper, Title } from "@/styles/MoviesDetails.styled";
import {type MovieDetails } from "@/types/Movies";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pl-PL`
        );

        if (!response.ok) {
          throw new Error("Error fetching movie details");
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (err) {
        console.error("Error", err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movieDetails) return <Container>Loading series details...</Container>;

  return (
    <div>
          <Navbar />
          <Container>

              <Title>{movieDetails.title}</Title>
              <PosterWrapper>
                  <Poster
                      src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                      alt={movieDetails.title} />
                  <Info>
                      <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                      <p><strong>Rating:</strong> {movieDetails.vote_average}/10</p>
                      <p><strong>Genres:</strong> {movieDetails.genres?.map(g => g.name).join(", ")}</p>
                      <Description>{movieDetails.overview}</Description>
                  </Info>
              </PosterWrapper>
          </Container>
          <Footer />
      </div>
  );
};

export default MovieDetails;