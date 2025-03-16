import styled from "styled-components";

export const Container = styled.div`
  width: 1400px;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;
`;

export const SectionButton = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 20px;
`;

export const ButtonViewMore = styled.button`
  background-color: blue;
  color: wheat;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
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
    justify-content: start;
    align-items: start;
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
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  padding: 20px;
  justify-content: center;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const PosterWrapper = styled.div`
  position: relative;
  width: 40%;
  height: 350px;

  @media (min-width: 768px) {
    width: 100%;
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
`;
