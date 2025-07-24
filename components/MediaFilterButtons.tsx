import { Button, Stack } from "@mui/material";
import { useState } from "react";


type MediaFilterButtonsProps = {  //to other files
  sortDirection: "asc" | "desc";
  setFilter: (val: string) => void;
  setSortDirection: (val: "asc" | "desc") => void;
}

export const MediaFilterButtons = ({ sortDirection, setFilter, setSortDirection }: MediaFilterButtonsProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("");

  const handleClick = (filter: string, toggleSort = false) => {
    if(activeFilter === filter) {
      setActiveFilter("");
      setFilter("");
      return
    }
    setFilter(filter);
    setActiveFilter(filter);

    if (toggleSort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
  };

  const isActive = (filter: string) => activeFilter === filter;

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={3} flexWrap="wrap">
      <Button
        variant={isActive("latest") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleClick("latest")}
      >
        Latest
      </Button>

      <Button
        variant={isActive("best_advised") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleClick("best_advised")}
      >
        Best advised
      </Button>

      <Button
        variant={isActive("rating") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleClick("rating")}
      >
        Rating
      </Button>

      <Button
        variant={isActive("year") ? "contained" : "outlined"}
        color="primary"
        onClick={() => handleClick("year")}
      >
        Year
      </Button>
    </Stack>
  );
};
