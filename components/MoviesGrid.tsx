"use client";
import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";
import { useState } from "react";
import { MediaShowAllButton } from "./MediaShowAllButton";
import { Movie } from "@/types";

type Props = {
  movies: Movie[];
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 26px;
  padding: 36px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 468px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 12px;
  }
`;

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
`;

const PosterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;

  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-bottom-right-radius: 8px;
  z-index: 2;
`;

const Label = styled.span`
  background-color: #ffcc00;
  color: #000;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 11px;
`;

const Rating = styled.div`
  font-size: 11px;
  font-weight: 600;
  background: #222;
  border-radius: 50px;
  padding: 2px 6px;
`;

const ShowMoreWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const MoviesGrid = ({ movies }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const visibleMovies = showAll ? movies : movies.slice(0, 5);

  return (
    <Grid>
      {visibleMovies.map((movie) => (
        <Card key={movie.id}>
          <PosterWrapper>
            <Link href={`/movies/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
                fill
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <PosterOverlay>
                <Label>Movies</Label>
                <Date>{movie.releaseDate}</Date>
                <Rating>{movie.vote_average?.toFixed(1)} ⭐</Rating>
              </PosterOverlay>
            </Link>
          </PosterWrapper>
        </Card>
      ))}

      {movies.length > 6 && (
        <ShowMoreWrapper>
          <MediaShowAllButton
            showAll={showAll}
            toggleShowAll={() => setShowAll((prev) => !prev)}
          />
        </ShowMoreWrapper>
      )}
    </Grid>
  );
};
