"use client";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { PopularMovies } from "./PopularMovies";
import styled from "styled-components";
import { PopularSeries } from "./PopularSeries";
import { SearchBar } from "./SearchBar";
import { FavouritesList } from "./FavouritesList";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-template-areas: "left content right";
  flex: 1;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: "content";
  }
`;

const LeftSidebar = styled.aside`
  grid-area: left;
  position: sticky;
  top: 0;
  background: #0d0d1d;
  z-index: 998;
  width: 80px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSidebar = styled.aside`
  grid-area: right;
  position: sticky;
  top: 30px;
  background: rgba(13, 13, 29, 0.8);
  z-index: 998;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentArea = styled.main`
  grid-area: content;
  min-height: 100vh;
`;

const Section = styled.section`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Layout = () => {
  return (
    <PageWrapper>
      <Navbar />
      <MainGrid>
        <LeftSidebar>
          <Sidebar />
        </LeftSidebar>

        <ContentArea>
          <Section>
            <SearchBar />
          </Section>
          <PopularMovies />
          <PopularSeries />
        </ContentArea>
        <RightSidebar>
          <FavouritesList />  
        </RightSidebar>
      </MainGrid>
      <Footer />
    </PageWrapper>
  );
};
