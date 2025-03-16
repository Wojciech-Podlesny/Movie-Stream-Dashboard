import { styled } from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #1a1a2e;
  border-top: 1px solid white;
  color: white;
  grid-column: 1 / 6;
  grid-row: 10 / 11;

  @media (min-width: 1024px) {
    grid-row: 7 / 8;
  }

  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
`;

export const FooterText = styled.h1`
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 1.125rem;

  @media (min-width: 768px) {
    width: auto;
    margin: 0 auto;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const IconLink = styled.a`
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  margin: 0 0.5rem;

  &:hover,
  &:focus {
    transform: scale(1.1);
    color: #1d4ed8;
  }
`;
