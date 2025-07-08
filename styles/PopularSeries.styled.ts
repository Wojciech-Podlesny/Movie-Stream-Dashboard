import { styled } from "styled-components";

export const Container = styled.div`
width: 1400px;
  color: #fff;
  background-color: #0d0d2f;
`;



export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  padding: 20px;
  justify-content: center;
`;

export const Card = styled.div`
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

export const SectionMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 20px;
  background-color: #0d0d2f;
  border-radius: 8px;
`;

export const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;