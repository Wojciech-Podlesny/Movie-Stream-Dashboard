import { styled } from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #0d0d1d;
  padding: 40px 20px;
`;

export const List = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
`;

export const Heading = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
  grid-column: 1 / -1;
  text-align: center;
`;

export const MovieItem = styled.div`
  position: relative;
  color: white;
  text-align: center;
`;

export const Poster = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: rgba(255, 0, 0, 0.8);
  border: none;
  border-radius: 50%;
  color: white;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

