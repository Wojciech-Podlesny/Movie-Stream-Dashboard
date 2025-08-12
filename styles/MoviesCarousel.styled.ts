import { styled } from "styled-components";

export const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const InnerCarouselWrapper = styled.div`
  width: 80%;
  position: relative;

`;

export const SlideWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const MoviePoster = styled.img`
  width: 100%;
  border-radius: 11px;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;