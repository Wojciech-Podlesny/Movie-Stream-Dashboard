import Image from "next/image";
import { Typography,  Tooltip, Collapse } from "@mui/material";
import { FavouritesButton } from "./FavouritesButton";
import { DescriptionReadMore } from "./DescriptionReadMore";
import { MediaHeaderInfo, MediaHeaderLayout, MediaHeaderMetaData, MediaHeaderOverview, MediaHeaderPosterWrapper, MediaHeaderTitleRow } from "@/styles/MediaDetailsSection.styled";


type SeriesHeaderProps = {
  id: number;
  posterPath: string;
  title: string;
  first_air_date: string;
  voteAverage: number;
  overview: string;
};

export const SeriesDetailsSection = ({
  id,
  posterPath,
  title,
  first_air_date,
  voteAverage,
  overview,
}: SeriesHeaderProps) => (
  <MediaHeaderLayout>
    <MediaHeaderPosterWrapper>
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
    </MediaHeaderPosterWrapper>

    <MediaHeaderInfo>
      <MediaHeaderTitleRow>
        <Typography variant="h5" color="white" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </MediaHeaderTitleRow>

      <MediaHeaderMetaData>
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
            📅 <span>{first_air_date}</span>
          </Typography>
        </Tooltip>

        <Tooltip title="Average users" arrow>
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
          type="series"
          data={{
            title,
            poster_path: posterPath,
            first_air_date,
            vote_average: voteAverage,
          }}
          aria-label="Add to favourites"
        />
      </MediaHeaderMetaData>

      <MediaHeaderOverview>
        <Typography variant="subtitle1" component="h6">
          Description:
        </Typography>
        <Collapse in={true} timeout={300}>
          <DescriptionReadMore text={overview} />
        </Collapse>
      </MediaHeaderOverview>
    </MediaHeaderInfo>
  </MediaHeaderLayout>
);
