import { styled } from "styled-components";

export const SectionMedia = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SectionMain = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 16px;
  }
`;

export const TrailerContainer = styled.div`
  margin-top: 41px;

  @media (max-width: 768px) {
    margin-top: 20px; 
  }
`;

export const MediaWrapper = styled.div`
  width: 100%;
  max-width: 1700px;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;
  padding: 0 10px;

  @media (max-width: 768px) {
    padding: 0 8px; 
  }

  @media (max-width: 480px) {
    padding: 0 6px;
  }
`;

export const SectionMediaDetails = styled.div<{ leftCol?: number }>`
  display: grid;
  grid-template-columns: ${({ leftCol = 250 }) => `${leftCol}px 1fr 250px`};
  grid-template-areas: "left content right";
  flex: 1;
  min-height: 100vh;
  transition: grid-template-columns 0.3s ease;

  @media (max-width: 1024px) {
    grid-template-columns: ${({ leftCol = 250 }) => `${leftCol}px 1fr 200px`};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: "content";
    min-height: auto; 
  }
`;


export const DesktopSectionFavouritesList = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;