"use client";
import { FavouritesList } from "@/components/FavouritesList";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SeriesList } from "@/components/SeriesList";
import { Sidebar } from "@/components/Sidebar";
import { styled } from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Series = () => {
  return (
    <div>
      <Navbar />

      <Section>
        <Sidebar />
        <SeriesList />
        <FavouritesList />
      </Section>

      <Footer />
    </div>
  );
};

export default Series;
