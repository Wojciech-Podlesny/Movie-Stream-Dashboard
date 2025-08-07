'use client'

import React, { useEffect } from "react";
import { fetchTrailer, resetTrailerState } from "@/app/store/Media/trailerSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  TrailerWrapper,
  TrailerMessage,
  TrailerIframe,
  TrailerTitle,
  TrailerWatchButton
} from "@/styles/MediaTrailer.styled";

type MovieTrailerProps = {
  movieTitle: string;
};

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

  if (loading) return <TrailerMessage>Loading movie trailer...</TrailerMessage>;
  if (error) return <TrailerMessage>{error}</TrailerMessage>;
  if (!videoKey) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
  const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1&rel=0&modestbranding=1`;

  return (
    <TrailerWrapper>
      <TrailerTitle>{movieTitle} – Trailer</TrailerTitle>
      <TrailerIframe
        src={embedUrl}
        title={`${movieTitle} trailer`}
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <TrailerWatchButton href={youtubeUrl} target="_blank" rel="noopener noreferrer">
        Watch on YouTube
      </TrailerWatchButton>
    </TrailerWrapper>
  );
};
