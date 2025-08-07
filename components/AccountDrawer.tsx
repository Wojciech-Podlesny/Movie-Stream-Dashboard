"use client";
import { AccountDrawerProps } from "@/types/account";
import { Drawer, Button, Box } from "@mui/material";
import Link from "next/link";


export const AccountDrawer = ({open, onClose, handleLogout}: AccountDrawerProps) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: 280,
        backgroundColor: "#0d0d1d",
        color: "#fff",
        p: 3,
      },
    }}
  >
    <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        fullWidth
        component={Link}
        href="/account"
        onClick={onClose}
        sx={{
          backgroundColor: "#1f1f2e",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: "15px",
          py: 1.2,
          "&:hover": { backgroundColor: "#2a2a3f" },
        }}
      >
        My Account
      </Button>

      <Button
        fullWidth
        component={Link}
        href="/movies"
        onClick={onClose}
        sx={{
          backgroundColor: "#1f1f2e",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: "15px",
          py: 1.2,
          "&:hover": { backgroundColor: "#2a2a3f" },
        }}
      >
        Movies
      </Button>

      
      <Button
        fullWidth
        component={Link}
        href="/series"
        onClick={onClose}
        sx={{
          backgroundColor: "#1f1f2e",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: "15px",
          py: 1.2,
          "&:hover": { backgroundColor: "#2a2a3f" },
        }}
      >
        Series
      </Button>

      <Button
        fullWidth
        onClick={() => {
          onClose();
          handleLogout();
        }}
        sx={{
          backgroundColor: "#e53935",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: "15px",
          py: 1.2,
          "&:hover": { backgroundColor: "#c62828" },
        }}
      >
        Logout
      </Button>
    </Box>
  </Drawer>
);
