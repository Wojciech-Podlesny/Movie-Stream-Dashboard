"use client";
import React, { useState } from "react";
import { Drawer, IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FavouritesList } from "./FavouritesList"; // ten, który zrobiliśmy wcześniej

export const MobileDrawerFavourites = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Favourites">
        <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
          <FavoriteBorderIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: "360px" },
            backgroundColor: "#0b0b15",
            padding: "20px 10px",
          },
        }}
      >
        <FavouritesList />
      </Drawer>
    </>
  );
};
