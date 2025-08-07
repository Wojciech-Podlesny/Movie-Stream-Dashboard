'use client'

import { Button, Stack } from "@mui/material";
import { useState } from "react";

type MediaFilterButtonsProps = {
  sortDirection: "asc" | "desc";
  setFilter: (val: string) => void;
  setSortDirection: (val: "asc" | "desc") => void;
};

export const MediaFilterButtons = ({
  sortDirection,
  setFilter,
  setSortDirection,
}: MediaFilterButtonsProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("");

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter("");
      setFilter("");
    } else {
      setActiveFilter(filter);
      setFilter(filter);
    }
  };
  
  const handleAZClick = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    setActiveFilter("a-z");
    setFilter("a-z");
  };

  const isActive = (filter: string) => activeFilter === filter;

  const buttonStyle = {
    borderRadius: "30px",
    color: "white",
    borderColor: "white",
    '&:hover': {
      borderColor: "white",
    },
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={3} flexWrap="wrap">
      <Button
        variant={isActive("latest") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilterClick("latest")}
        sx={buttonStyle}
      >
        Latest
      </Button>

      <Button
        variant={isActive("best_advised") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilterClick("best_advised")}
        sx={buttonStyle}
      >
        Best advised
      </Button>

      <Button
        variant={isActive("rating") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilterClick("rating")}
        sx={buttonStyle}
      >
        Rating
      </Button>

      <Button
        variant={isActive("year") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleFilterClick("year")}
        sx={buttonStyle}
      >
        Year
      </Button>

      <Button
        variant={isActive("a-z") ? "contained" : "outlined"}
        color="primary"
        onClick={handleAZClick}
        sx={buttonStyle}
      >
        {sortDirection === "asc" ? "A-Z" : "Z-A"}
      </Button>
    </Stack>
  );
};
