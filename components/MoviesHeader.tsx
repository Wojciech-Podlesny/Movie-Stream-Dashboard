import Image from "next/image";
import { AddToFavoritesButton } from "@/components/AddToFavoritesButton";
import { styled } from "styled-components";
import { useState } from "react";
import {
  Typography,
  Button,
  Tooltip,
  Collapse,
} from "@mui/material";

// Stylizacja wrappera
const DetailsLayout = styled.div`
  display: flex;
  flex-direction: row;
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

// Stylizacja bloku informacji o filmie
const MovieInfo = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Stylizacja plakatu
const PosterWrapper = styled.div`
  flex-shrink: 0;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// Stylizacja sekcji z oceną i datą
const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// Stylizacja sekcji opisu
const OverviewSection = styled.div`
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

const ReadMore = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const characterLimit = 100;
  const isLong = text.length > characterLimit;
  const preview = text.slice(0, characterLimit) + "...";

  return (
    <>
      <Typography
        variant="body1"
        color="white"
        sx={{
          lineHeight: 1.8,
          fontSize: "1rem",
          whiteSpace: "pre-line",
          letterSpacing: "0.3px",
          textAlign: "justify",
        }}
      >
        {expanded || !isLong ? text : preview}
      </Typography>

      {isLong && (
        <Button
          onClick={() => setExpanded((prev) => !prev)}
          size="small"
          sx={{
            mt: 1,
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "#90caf9",
            textTransform: "none",
            padding: "2px 0",
            minWidth: 0,
            '&:hover': {
              color: "#64b5f6",
              backgroundColor: "transparent",
            },
          }}
        >
          {expanded ? "Zwiń opis" : "Czytaj więcej"}
        </Button>
      )}
    </>
  );
};

// Typy propsów
type Props = {
  id: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
};

// Główny komponent
export const MoviesHeader = ({
  id,
  posterPath,
  title,
  releaseDate,
  voteAverage,
  overview,
}: Props) => (
  <DetailsLayout>
    <PosterWrapper>
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
        sx={{ mt: 2, maxWidth: "200px", textAlign: "center", fontSize:"large" }}
      >
        {title}
      </Typography>
    </PosterWrapper>

    <MovieInfo>
      <Typography variant="h5" color="white" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>

   <MetaData>
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
</MetaData>


      <AddToFavoritesButton
        movie={{ id, title, posterPath, releaseDate, voteAverage, overview }}
      />

      <OverviewSection>
        <Typography variant="subtitle1" component="h6">
          Opis:
        </Typography>
        <Collapse in={true} timeout={300}>
          <ReadMore text={overview} />
        </Collapse>
      </OverviewSection>
    </MovieInfo>
  </DetailsLayout>
);
