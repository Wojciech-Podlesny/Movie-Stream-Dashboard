"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MediaShowAllButton } from "./MediaShowAllButton";
import { Movie } from "@/types";
import { FavouritesButton } from "./FavouritesButton";

import {
  MediaGridWrapper,
  MediaCard,
  MediaPosterWrapper,
  MediaOverlay,
  MediaLabel,
  MediaDate,
  MediaRating,
  MediaToggleButtonWrapper,
  MediaFavouriteIconWrapper,
} from "@/styles/MediaGrid.styled";

type MoviesProps = {
  movies: Movie[];
  showToggle?: boolean;       
  initialVisible?: number;     
};

export const MoviesGrid = ({
  movies,
  showToggle = true,
  initialVisible = 5,
}: MoviesProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleMovies = showToggle
    ? showAll
      ? movies
      : movies.slice(0, initialVisible)
    : movies;

  return (
    <MediaGridWrapper>
      {visibleMovies.map((movie) => (
        <MediaCard key={movie.id}>
          <MediaPosterWrapper>
            <Link href={`/movies/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
                fill
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <MediaOverlay>
                <MediaLabel>Movie</MediaLabel>
                <MediaDate>{movie.releaseDate}</MediaDate>
                <MediaRating>{movie.vote_average?.toFixed(1)} ⭐</MediaRating>
              </MediaOverlay>
            </Link>

            <MediaFavouriteIconWrapper>
              <FavouritesButton
                itemId={movie.id.toString()}
                type="movie"
                data={{
                  title: movie.title,
                  poster_path: movie.poster_path,
                  releaseDate: movie.releaseDate,
                  vote_average: movie.vote_average,
                }}
              />
            </MediaFavouriteIconWrapper>
          </MediaPosterWrapper>
        </MediaCard>
      ))}

      {showToggle && movies.length > initialVisible && (
        <MediaToggleButtonWrapper>
          <MediaShowAllButton
            showAll={showAll}
            toggleShowAll={() => setShowAll((prev) => !prev)}
          />
        </MediaToggleButtonWrapper>
      )}
    </MediaGridWrapper>
  );
};
