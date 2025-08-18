import { Box, Pagination } from "@mui/material";
import {ChangeEvent} from "react"

type MediaPaginationProps = {
  totalPages: number;
  page: number;
  onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
};

export const MediaPagination = ({ totalPages, page, onPageChange }: MediaPaginationProps) => (
  <Box display="flex" justifyContent="center" marginTop={4} marginBottom={4}>
    <Pagination
      count={totalPages}
      page={page}
      onChange={onPageChange}
      color="primary"
      sx={{
        "& .MuiPaginationItem-root": {
          color: "white",
        },
      }}
    />
  </Box>
);
