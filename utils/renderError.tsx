import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import CircularProgress from "@mui/material/CircularProgress";

import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;
  padding: 0 10px;

  @media (max-width: 480px) {
    padding: 0 6px;
  }
`;

export const SectionButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ButtonViewMore = styled.button`
  background-color: blue;
  color: wheat;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
    padding: 8px 16px;
  }
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;

export const SectionMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 20px;
  background-color: #0d0d2f;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 16px 12px;
  }
`;

export const FilterButton = styled.button`
  background: transparent;
  border: 2px solid #00aaff;
  color: #00aaff;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: #00aaff;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const Rating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: yellow;
  color: black;
  padding: 5px 8px;
  font-weight: bold;
  border-radius: 5px;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 6px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 26px;
  padding: 36px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
    gap: 12px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px;
  }
`;

export const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;

  /* &:hover {
    transform: scale(1.05);
  } */
`;

export const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;

  @media (max-width: 480px) {
    aspect-ratio: 2 / 3;
    width: 25%;
    height: 80%;
  }
  
`;


export const renderLoading = () => (
  <Container>
    <Navbar />
    Loading details movies... <CircularProgress />
    <Footer />
  </Container>
);

export const renderError = (error: string | null) => (
  <Container>
    <Navbar />
    <p>{error || "Not found details movies..."}</p>
    <Footer />
  </Container>
);



  // if (loading) return <Container>Loading movies... <CircularProgress /></Container>;
  // if (error) return <Container>{error}</Container>;


  