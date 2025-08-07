import Link from "next/link";
import { styled } from "styled-components";

export const TrailerWrapper = styled.div`  
  background-color: #121212;
  padding: 2rem;
  margin: 40px auto;
  border-radius: 16px;
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.06);
`;

export const TrailerTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #facc15;
  margin-bottom: 1rem;
  text-align: center;
`;

export const TrailerIframe = styled.iframe`
  width: 100%;
  max-width: 900px;
  height: 500px;
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
`;

export const TrailerMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #aaa;
  margin-top: 20px;
`;

export const TrailerWatchButton = styled(Link)`
  margin-top: 20px;
  background: linear-gradient(to right, #facc15, #f59e0b);
  color: black;
  padding: 10px 24px;
  border-radius: 9999px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #fbbf24, #f59e0b);
  }
`;
