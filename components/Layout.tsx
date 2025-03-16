import { styled } from "styled-components";
import { Navbar } from "./Navbar";
import { MoviesList } from "./MoviesList";
import { FavouritesList } from "./FavouritesList";
import { Footer } from "./Footer";
import { SeriesList } from "./SeriesList";
import { Sidebar } from "./Sidebar";

const DivContainer = styled.div`
  margin: 0 auto;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Layout = () => {
  return (
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
    </DivContainer>
  );
};
