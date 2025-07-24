"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { RiMovie2Line } from "react-icons/ri";
import { SearchBar } from "./SearchBar";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import { AccountDrawer } from "./AccountDrawer";
import { AuthActions } from "./AuthActions";
import { FavouritesDrawer } from "./FavouritesDrawer";
import { Actions, Logo, MobileIcons, NavbarContainer, SearchWrapper } from "@/styles/Navbar.styled";


export const Navbar = () => {
  const { data: session, status } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [favouritesDrawerOpen, setFavouritesDrawerOpen] = useState(false);
  const isAuthenticated = status == "authenticated"

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <NavbarContainer>
        <Link href="/" passHref>
          <Logo>
            <RiMovie2Line size={32} />
            Movie
          </Logo>
        </Link>
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>
        <Actions>
          {status !== "loading" && (
            <AuthActions
              session={session}
              onAvatarClick={() => setAccountDrawerOpen(true)}
            />
          )}
        </Actions>
        <MobileIcons>
          <IconButton
            onClick={() => setFavouritesDrawerOpen(true)}
            sx={{ color: "#fff" }}
          >
            {isAuthenticated && <FavoriteBorderIcon />}
          </IconButton>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </MobileIcons>
      </NavbarContainer>

      <MobileMenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        session={
          session
            ? {
                user: session.user
                  ? {
                      name: session.user.name ?? undefined,
                      email: session.user.email ?? undefined,
                      image: session.user.image ?? undefined,
                    }
                  : undefined,
              }
            : null
        }
        handleLogout={handleLogout}
      />

      <FavouritesDrawer
        open={favouritesDrawerOpen}
        onClose={() => setFavouritesDrawerOpen(false)}
      />

      <AccountDrawer
        open={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
        handleLogout={handleLogout}
      />
    </>
  );
};
