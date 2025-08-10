import { styled } from "styled-components";

export const MediaHeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
  margin: 40px;
  flex-wrap: wrap;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
`;

export const MediaHeaderInfo = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MediaHeaderPosterWrapper = styled.div`
  flex-shrink: 0;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const MediaHeaderMetaData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`;

export const MediaHeaderOverview = styled.div`
  margin-top: 32px;
  color: white;
  width: 100%;

  & h6 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 12px;
    border-bottom: 1px solid #444;
    padding-bottom: 4px;
    color: #90caf9;
  }
`;

export const MediaHeaderTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;
