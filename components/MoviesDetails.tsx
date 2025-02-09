

import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: red;
  margin-bottom: 20px;
`;

const Poster = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-top: 15px;
  color: red;
`;

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    overview?: string;
    release_date?: string;
    vote_average?: number;
    genres?: { id: number; name: string }[];
  };

export const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState<Movie | null>(null);


   useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/27205?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pl-PL`
         
        );

        if (!response.ok) {
          throw new Error('Error');
        }

        const data  = await response.json();
        setMovieDetails(data)
        console.log(data)
       
        
     
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        console.error('Error')
      }
    };

    fetchMovies();
  }, []);


  if (!movieDetails) return <Container>No movie details found</Container>;



  return (
    <Container>
      <Title>{movieDetails.title}</Title>
      <Poster src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
      <Description>{movieDetails.overview}</Description>
      <p>{movieDetails.release_date}</p>
    </Container>
  );
};


