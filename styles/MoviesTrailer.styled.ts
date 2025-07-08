import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ErrorMessage = styled.p`
  color: red;
`;

export const LoadingMessage = styled.p`
  font-style: italic;
`;

export const StyledIframe = styled.iframe`
  width: 80%;
  height: 500px;
  border: none;
`;

export const TitleTrailer = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;