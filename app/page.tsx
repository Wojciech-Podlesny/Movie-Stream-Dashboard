"use client";

import { styled } from "styled-components";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SeriesList } from "@/components/SeriesList";
import { FavouritesList } from "@/components/FavouritesList";
import { Footer } from "@/components/Footer";
import { MoviesList } from "@/components/MoviesList";
import { MovieContextProvider } from "@/context/context";
// import { MovieDetails } from "@/components/MoviesDetails";

const DivContainer = styled.div`
  margin: 0;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default function Home() {
  return (
    <MovieContextProvider>
      <DivContainer>
        <Navbar />
        <MainContainer>
          <Sidebar />
          <MoviesContainer>
            <MoviesList />
            <SeriesList />
          </MoviesContainer>
          <FavouritesList />
        </MainContainer>
        <Footer />
        {/* <MovieDetails /> */}
      </DivContainer>
    </MovieContextProvider>
  );
}
