import Image from "next/image";
import { styled } from "styled-components";
import { Typography,  Tooltip, Collapse } from "@mui/material";
import { FavouritesButton } from "./FavouritesButton";
import { DescriptionReadMore } from "./DescriptionReadMore";

const MovieHeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
  margin: 40px;
  flex-wrap: wrap;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
`;

const MovieHeaderInfo = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MovieHeaderPosterWrapper = styled.div`
  flex-shrink: 0;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const MovieHeaderMetaData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`;

const MovieHeaderOverview = styled.div`
  margin-top: 32px;
  color: white;
  width: 100%;

  & h6 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 12px;
    border-bottom: 1px solid #444;
    padding-bottom: 4px;
    color: #90caf9;
  }
`;

const MovieHeaderTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

type MoviesHeaderProps = {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
};

export const MoviesDetailsSection = ({
  id,
  posterPath,
  title,
  releaseDate,
  voteAverage,
  overview,
}: MoviesHeaderProps) => (
  <MovieHeaderLayout>
    <MovieHeaderPosterWrapper>
      <Image
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        width={200}
        height={300}
        loading="lazy"
        style={{ borderRadius: "10px" }}
      />
      <Typography
        variant="caption"
        color="white"
        sx={{ mt: 2, maxWidth: "200px", textAlign: "center", fontSize: "large" }}
      >
        {title}
      </Typography>
    </MovieHeaderPosterWrapper>

    <MovieHeaderInfo>
      <MovieHeaderTitleRow>
        <Typography variant="h5" color="white" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </MovieHeaderTitleRow>

      <MovieHeaderMetaData>
        <Tooltip title="Data premiery" arrow>
          <Typography
            variant="body1"
            color="white"
            sx={{
              fontSize: "1.2rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            📅 <span>{releaseDate}</span>
          </Typography>
        </Tooltip>

        <Tooltip title="Średnia ocen użytkowników" arrow>
          <Typography
            variant="body1"
            color="white"
            sx={{
              fontSize: "1.2rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ⭐ <span>{voteAverage.toFixed(1)} / 10</span>
          </Typography>
        </Tooltip>

        <FavouritesButton
          itemId={id.toString()}
          type="movie"
          data={{
            title,
            poster_path: posterPath,
            releaseDate,
            vote_average: voteAverage,
          }}
          aria-label="Dodaj do ulubionych"
        />
      </MovieHeaderMetaData>

      <MovieHeaderOverview>
        <Typography variant="subtitle1" component="h6">
          Description:
        </Typography>
        <Collapse in={true} timeout={300}>
          <DescriptionReadMore text={overview} />
        </Collapse>
      </MovieHeaderOverview>
    </MovieHeaderInfo>
  </MovieHeaderLayout>
);
