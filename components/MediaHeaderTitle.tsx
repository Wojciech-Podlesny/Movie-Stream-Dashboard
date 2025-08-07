'use client'
import { MovieIconStyled, SectionHeaderContainer, SeriesIconStyled } from "@/styles/MediaHeaderTitle.styled";

type MediaFilterTitleProps = {
  type: "movies" | "series";
};

export const MediaHeaderTitle = ({ type }: MediaFilterTitleProps) => (
  <SectionHeaderContainer>
    {type === "movies" ? <MovieIconStyled /> : <SeriesIconStyled />}
    {type === "movies" ? "Movies" : "Series"}
  </SectionHeaderContainer>
);

