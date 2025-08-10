"use client";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import HomeRounded from "@mui/icons-material/HomeRounded";
import LoginRounded from "@mui/icons-material/LoginRounded";
import PersonAddAltRounded from "@mui/icons-material/PersonAddAltRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  session: {
    user?: { name?: string; email?: string; image?: string };
  } | null;
  handleLogout: () => void;
}

export const MobileMenuDrawer = ({
  open,
  onClose,
  session,
  handleLogout,
}: MobileMenuDrawerProps) => (
  <Drawer
    anchor="left"
    open={open}
    onClose={onClose}
    ModalProps={{ keepMounted: true }}
    PaperProps={{
      sx: {
        width: { xs: "82vw", sm: 320 },       
        maxWidth: 360,
        backgroundColor: "#0d0d1d",
        color: "#fff",
        borderTopRightRadius: 16,               
        borderBottomRightRadius: 16,
        overflow: "hidden",
      },
    }}
    slotProps={{
      backdrop: {
        sx: {
          backgroundColor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",        
        },
      },
    }}
  >
 
    <Box
      sx={{
        pt: "calc(env(safe-area-inset-top, 0px) + 16px)",
        pb: 2,
        px: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Avatar
        src={session?.user?.image}
        alt={session?.user?.name || "User"}
        sx={{ width: 40, height: 40, bgcolor: "#1b1b33" }}
      />
      <Box>
        <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }}>
          {session?.user?.name || "Guest"}
        </Typography>
        <Typography variant="caption" color="rgba(255,255,255,0.6)">
          {session?.user?.email || "Not signed in"}
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

    <List sx={{ py: 0 }}>
      <ListItem disablePadding>
        <ListItemButton component={Link} href="/" onClick={onClose}>
          <ListItemIcon sx={{ color: "rgba(255,255,255,0.9)" }}>
            <HomeRounded />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>

      {!session ? (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/login" onClick={onClose}>
              <ListItemIcon sx={{ color: "rgba(255,255,255,0.9)" }}>
                <LoginRounded />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/register" onClick={onClose}>
              <ListItemIcon sx={{ color: "rgba(255,255,255,0.9)" }}>
                <PersonAddAltRounded />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/account" onClick={onClose}>
              <ListItemIcon sx={{ color: "rgba(255,255,255,0.9)" }}>
                <AccountCircleRounded />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              <ListItemIcon sx={{ color: "rgba(255,255,255,0.9)" }}>
                <LogoutRounded />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  </Drawer>
);
