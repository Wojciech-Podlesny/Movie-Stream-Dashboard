"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { RiMovie2Line } from "react-icons/ri";
import { styled } from "styled-components";
import { SearchBar } from "./SearchBar";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

import { AccountDrawer } from "./AccountDrawer";
import { AuthActions } from "./AuthActions";
import { FavouritesDrawer } from "./FavouritesDrawer";

export const NavbarContainer = styled.div`
  background-color: rgba(13, 13, 29, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  min-height: 64px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    text-decoration: none;
  }
`;

const MobileIcons = styled.div`
  display: flex;
  gap: 8px;

  @media (min-width: 769px) {
    display: none;
  }
`;

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
