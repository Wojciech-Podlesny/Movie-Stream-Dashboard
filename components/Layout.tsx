"use client";

import { useState } from "react";
import { styled } from "styled-components";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { SearchBar } from "./SearchBar";
import { PopularMovies } from "./PopularMovies";
import { PopularSeries } from "./PopularSeries";
import { FavouritesList } from "./FavouritesList";
import { Footer } from "./Footer";
import { NowPlayingMovies } from "./NowPlayingMovies";
import { UpcomingMovies } from "./UpcomingMovies";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainGrid = styled.div<{ leftCol: number }>`
  display: grid;
  grid-template-columns: ${({ leftCol }) => `${leftCol}px minmax(0, 1fr) 250px`};
  grid-template-areas: "left content right";
  flex: 1;
  min-height: 100vh;
  transition: grid-template-columns 0.3s ease;

  @media (max-width: 1024px) {
    grid-template-columns: ${({ leftCol }) => `${leftCol}px minmax(0, 1fr)`};
    grid-template-areas: "left content";
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: "content";
  }
`;

const LeftSidebar = styled.aside<{ widthPx: number }>`
  grid-area: left;
  position: sticky;
  top: 0;
  background: #0d0d1d;
  z-index: 998;
  width: ${({ widthPx }) => `${widthPx}px`};
  transition: width 0.3s ease;
  box-sizing: border-box;

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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ContentArea = styled.main`
  grid-area: content;
  min-height: 100vh;
  min-width: 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

 
`;

const SectionHeader = styled.section`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    display: none; 
  }
`;


const MobileSidebar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin: 8px 0 16px;
  }
`;

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const leftWidth = isSidebarOpen ? 250 : 80;

  return (
    <PageWrapper>
      <Navbar />

      <MainGrid leftCol={leftWidth}>
        <LeftSidebar widthPx={leftWidth}>
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((v) => !v)}
          />
        </LeftSidebar>

        <ContentArea>
          <SectionHeader>
            <SearchBar />
          </SectionHeader>

          <MobileSidebar>
            <Sidebar
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen((v) => !v)}
            />
          </MobileSidebar>
          <NowPlayingMovies />
          <PopularMovies />
          <PopularSeries />
          <UpcomingMovies />
        </ContentArea>

  
        <RightSidebar>
          <FavouritesList />
        </RightSidebar>
      </MainGrid>

      <Footer />
    </PageWrapper>
  );
};
