import { styled } from "styled-components";

export const MediaPageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MediaPageSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const MediaPageContainer = styled.div`
  width: 2000px;
  color: #fff;
  background-color: #0d0d2f;
`;

export const MediaPageTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;

export const MediaGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  padding: 20px;
  justify-content: center;
`;

export const MediaCard = styled.div`
  background-color: #0d0d2f;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.3);
  }
`;

export const MediaPageMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 20px;
  background-color: #0d0d2f;
  border-radius: 8px;
`;

export const MediaPosterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;
