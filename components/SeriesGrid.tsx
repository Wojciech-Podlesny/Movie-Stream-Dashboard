// import { Card, Grid, PosterWrapper } from "@/styles/PopularMovies.styled";
// import Image from "next/image";
// import Link from "next/link";

// type Series = {
//   id: number;
//   poster_path: string;
//   name: string;
// };

// type Props = {
//   series: Series[];
// };

// export const SeriesGrid = ({ series }: Props) => (
//   <Grid>
//     {series.map((series) => (
//       <Card key={series.id}>
//         <PosterWrapper>
//           <Link href={`/movies/${series.id}`}>
//             <Image
//               src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
//               alt={series.name}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             />
//           </Link>
//         </PosterWrapper>
//       </Card>
//     ))}
//   </Grid>
// );


"use client";
import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";

import { MediaShowAllButton } from "./MediaShowAllButton";
import { useState } from "react";
import { FavoriteToggleIconSeries } from "./FavouriteToogleIconSeries";


type Series = {
  id: number;
  poster_path: string;
  name: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
};

type Props = {
  series: Series[];
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
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  @media (max-width: 468px) {
    max-width: 100%;
  }
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const PosterContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ShowMoreWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


export const SeriesGrid = ({ series }: Props) => {
    const [showAll, setShowAll] = useState(false);
    const visibleSeries = showAll ? series : series.slice(0, 7);
    return (
      <Grid>
        {visibleSeries.map((series) => (
          <Card key={series.id}>
            <PosterWrapper>
              <PosterContainer>
              <FavoriteToggleIconSeries series={{
                id: series.id,
                name: series.name,
                poster_path: series.poster_path,
                first_air_date: series.first_air_date || "",
                vote_average: series.vote_average || 0,
                overview: series.overview || "",
              }} />  
                <Link href={`/series/${series.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                    alt={series.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
              </PosterContainer>
            </PosterWrapper>
          </Card>
        ))}
        {series.length > 6 && (
          <ShowMoreWrapper>
            <MediaShowAllButton showAll={showAll} toggleShowAll={() => setShowAll((prev) => !prev)} />
          </ShowMoreWrapper>
        )}
      </Grid>
    );
};

