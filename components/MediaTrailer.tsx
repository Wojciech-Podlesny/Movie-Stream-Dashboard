import React, { useEffect } from "react";
import { fetchTrailer, resetTrailerState } from "@/app/store/Media/trailerSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { styled } from "styled-components";

type MovieTrailerProps = { //to other files
  movieTitle: string;
};

const Container = styled.div`   //to toher files
  background-color: #121212;
  padding: 2rem;
  margin: 40px auto;
  border-radius: 16px;
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.06);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #facc15;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 900px;
  height: 500px;
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
`;

const Message = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #aaa;
  margin-top: 20px;
`;

const WatchButton = styled.a`
  margin-top: 20px;
  background: linear-gradient(to right, #facc15, #f59e0b);
  color: black;
  padding: 10px 24px;
  border-radius: 9999px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #fbbf24, #f59e0b);
  }
`;

export const MoviesTrailer = ({ movieTitle }: MovieTrailerProps) => {
  const dispatch = useAppDispatch();
  const { videoKey, loading, error } = useAppSelector((state) => state.trailer);

  useEffect(() => {
    if (!movieTitle) return;
    dispatch(fetchTrailer(movieTitle));
    return () => {
      dispatch(resetTrailerState());
    };
  }, [movieTitle, dispatch]);

  if (loading) return <Message>Loading movie trailer...</Message>;
  if (error) return <Message>{error}</Message>;
  if (!videoKey) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;

 const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1&rel=0&modestbranding=1`;

  return (
    <Container>
      <Title>{movieTitle} – Trailer</Title>
      <StyledIframe
        src={embedUrl}
        title={`${movieTitle} trailer`}
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <WatchButton href={youtubeUrl} target="_blank" rel="noopener noreferrer">
        Watch on YouTube
      </WatchButton>
    </Container>
  );
};