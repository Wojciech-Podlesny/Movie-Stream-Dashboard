"use client";
import Image from "next/image";
import Link from "next/link";
import { MediaShowAllButton } from "./MediaShowAllButton";
import { useState } from "react";
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


type Series = {
  id: number;
  poster_path: string;
  name: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
};

type SeriesProps = {
  series: Series[];
  showToggle?: boolean;        
  initialVisible?: number;     
};

export const SeriesGrid = ({ series,showToggle = true,
  initialVisible = 5, }: SeriesProps) => {
    const [showAll, setShowAll] = useState(false);
    
      const visibleSeries = showToggle
    ? showAll
      ? series
      : series.slice(0, initialVisible)
    : series;

return (
<MediaGridWrapper>
      {visibleSeries.map((series) => (
        <MediaCard key={series.id}>
          <MediaPosterWrapper>
            <Link href={`/series/${series.id}`}>
              <Image
                    src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                    alt={series.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
              <MediaOverlay>
                <MediaLabel>Series</MediaLabel>
                <MediaDate>{series.first_air_date}</MediaDate>
                <MediaRating>{series.vote_average?.toFixed(1)} ⭐</MediaRating>
              </MediaOverlay>
            </Link>

            <MediaFavouriteIconWrapper>
              {/* <FavouritesButton
                itemId={series.id.toString()}
                type="series"
                data={{
                  title: series.title,
                  poster_path: series.poster_path,
                  releaseDate: series.releaseDate,
                  vote_average: series.vote_average,
                }}
              /> */}
            </MediaFavouriteIconWrapper>
          </MediaPosterWrapper>
        </MediaCard>
      ))}

      {showToggle && series.length > initialVisible && (
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


