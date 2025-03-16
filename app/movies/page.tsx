"use client";
import { FavouritesList } from "@/components/FavouritesList";
import { Footer } from "@/components/Footer";
import { MoviesList } from "@/components/MoviesList";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { styled } from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Movies = () => {
  return (
    <div>
      <Navbar />

      <Section>
        <Sidebar />
        <MoviesList />
        <FavouritesList />
      </Section>

      <Footer />
    </div>
  );
};

export default Movies;
