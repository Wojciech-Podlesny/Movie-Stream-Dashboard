"use client";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";


interface MobileMenuDrawerProps { //to other files
  open: boolean;
  onClose: () => void;
  session: {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  } | null;
  handleLogout: () => void;
}

export const MobileMenuDrawer = ({ open, onClose, session, handleLogout }: MobileMenuDrawerProps) => (
  <Drawer
    anchor="left"
    open={open}
    onClose={onClose}
    PaperProps={{ sx: { backgroundColor: "#0d0d1d", color: "#fff" } }}
  >
    <List sx={{ width: 250 }}>
      <ListItem disablePadding>
        <ListItemButton component={Link} href="/" onClick={onClose}>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      {!session ? (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/login" onClick={onClose}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/register" onClick={onClose}>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/account" onClick={onClose}>
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
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  </Drawer>
);
