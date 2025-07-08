"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { styled } from "styled-components";
import { addFavorite, removeFavorite } from "@/app/store/Media/favouritesSlice";

type Series = {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  overview: string;
};

const HeartButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
`;

type Props = {
 series: Series;
};

export const FavoriteToggleIconSeries = ({ series }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favourites.items);
  const isFavorite = favorites.some((m) => m.id === series.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(series.id));
    } else {
      dispatch(
        addFavorite({
          id: series.id,
          title: series.name,
          posterPath: series.poster_path,
          releaseDate: series.first_air_date,
          voteAverage: series.vote_average,
          overview: series.overview,
        })
      );
    }
  };

  return (
    <HeartButton onClick={toggleFavorite}>
      {isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart color="white" />}
    </HeartButton>
  );
};