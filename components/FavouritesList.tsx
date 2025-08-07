"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, Button } from "@mui/material";
import { FavouriteItem } from "@/types/favourites";
import styled from "styled-components";
import {
  FavoritesHeading,
  FavoritesGrid,
  FavoriteItem,
  FavoritePoster,
  RemoveFavoriteButton,
  FavoritesWrapper,
} from "@/styles/FavouritesList.styled";

const NotLoggedBox = styled.div`
  color: white;
  text-align: center;
  border-radius: 12px;
  padding: 24px 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const NotLoggedText = styled.p`
  margin-bottom: 12px;
`;

const NotLoggedButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const FavouritesList = () => {
  const { data: session, status } = useSession();
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user?.idToken) return;
      const res = await fetch("/api/account/favourites", {
        headers: {
          Authorization: `Bearer ${session.user.idToken}`,
        },
      });
      const data = await res.json();
      setFavourites(data);
    };

    if (status === "authenticated") {
      fetchFavorites();
    }
  }, [session?.user?.idToken, status]);

  const handleRemove = async (itemId: string) => {
    if (!session?.user?.idToken) return;
    await fetch("/api/account/favourites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.idToken}`,
      },
      body: JSON.stringify({ itemId }),
    });
    setFavourites((prev) => prev.filter((fav) => fav.itemId !== itemId));
  };

  if (status !== "authenticated") {
    return (
      <FavoritesWrapper>
        <NotLoggedBox>
          <NotLoggedText>
            Sign in or <strong>sign up</strong> to add items to your favourites.
          </NotLoggedText>
          <NotLoggedButtons>
            <Link href="/register" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#0d0d1d",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Register
              </Button>
            </Link>
          </NotLoggedButtons>
        </NotLoggedBox>
      </FavoritesWrapper>
    );
  }

  return (
    <FavoritesWrapper>
      <FavoritesGrid>
        <FavoritesHeading>Your favourites</FavoritesHeading>
        {favourites.length === 0 ? (
          <p style={{ color: "gray", gridColumn: "1 / -1", textAlign: "center" }}>
            No favourites added yet.
          </p>
        ) : (
          favourites.map((item) => (
            <FavoriteItem key={item.itemId}>
              <Tooltip title="Remove">
                <RemoveFavoriteButton onClick={() => handleRemove(item.itemId)}>
                  <CloseIcon fontSize="small" />
                </RemoveFavoriteButton>
              </Tooltip>
              <FavoritePoster
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title}
                width={100}
                height={150}
              />
              <p>{item.title}</p>
            </FavoriteItem>
          ))
        )}
      </FavoritesGrid>
    </FavoritesWrapper>
  );
};
