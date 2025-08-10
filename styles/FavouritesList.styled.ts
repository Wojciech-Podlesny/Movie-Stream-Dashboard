import { styled } from "styled-components";
import Image from "next/image";

export const FavoritesWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #0d0d1d;
  padding: 40px 20px;
`;

export const FavoritesGrid = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
`;

export const FavoritesHeading = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
  grid-column: 1 / -1;
  text-align: center;
`;

export const FavoriteItem = styled.div`
  position: relative;
  color: white;
  text-align: center;
`;

export const FavoritePoster = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`;

export const RemoveFavoriteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: rgba(255, 0, 0, 0.8);
  border: none;
  border-radius: 50%;
  color: white;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotLoggedBox = styled.div`
  color: white;
  text-align: center;
  border-radius: 12px;
  padding: 24px 16px;
  max-width: 400px;
  margin: 0 auto;
`;

export const NotLoggedText = styled.p`
  margin-bottom: 12px;
`;

export const NotLoggedButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;