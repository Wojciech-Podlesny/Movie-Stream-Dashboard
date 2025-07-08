import { FormControl, MenuItem, Select } from "@mui/material";

type Props = {
  sortDirection: "asc" | "desc";
  setFilter: (val: string) => void;
  setSortDirection: (val: "asc" | "desc") => void;
};

export const MediaSortSelect = ({ sortDirection, setFilter, setSortDirection }: Props) => (
<FormControl
  variant="outlined"
  sx={{
    minWidth: 140,
    ml: { xs: 0, md: 2 }, 
  }}
>
    <Select
      value={sortDirection}
      onChange={(e) => {
        setFilter("a-z");
        setSortDirection(e.target.value as "asc" | "desc");
      }}
      displayEmpty
      sx={{
        color: "white",
        bgcolor: "#1c1c1c",
        borderRadius: 1,
        ".MuiSelect-icon": { color: "white" },
      }}
    >
      <MenuItem value="asc">A-Z</MenuItem>
      <MenuItem value="desc">Z-A</MenuItem>
    </Select>
  </FormControl>
);
