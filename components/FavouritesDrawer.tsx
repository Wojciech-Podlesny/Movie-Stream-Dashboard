"use client";
import { Drawer, IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FavouritesList } from "./FavouritesList";
import { favouritesDrawerProps } from "@/types/favourites";

export const FavouritesDrawer = ({ open, onClose }: favouritesDrawerProps) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: { xs: "50%", sm: "360px" },
        backgroundColor: "#0d0d1d",
        color: "#fff",
        padding: "20px 10px",
      },
    }}
  >
    <Box sx={{ height: "100%", position: "relative", overflowY: "hidden" }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#fff",
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.08)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        <ArrowBackIosNewIcon fontSize="medium" />
      </IconButton>

      <Box sx={{ mt: 5 }}>
        <FavouritesList />
      </Box>
    </Box>
  </Drawer>
);