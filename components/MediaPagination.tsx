import { Box, Pagination } from "@mui/material";

type Props = {
  totalPages: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export const MoviesPagination = ({ totalPages, page, onPageChange }: Props) => (
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
