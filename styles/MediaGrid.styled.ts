import styled from "styled-components";

export const MediaGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 26px;
  padding: 36px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 468px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 12px;
  }
`;

export const MediaCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const MediaPosterWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
`;

export const MediaOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-bottom-right-radius: 8px;
  z-index: 2;
`;

export const MediaLabel = styled.span`
  background-color: #ffcc00;
  color: #000;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
`;

export const MediaDate = styled.div`
  font-size: 11px;
`;

export const MediaRating = styled.div`
  font-size: 11px;
  font-weight: 600;
  background: #222;
  border-radius: 50px;
  padding: 2px 6px;
`;

export const MediaToggleButtonWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const MediaFavouriteIconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 5;
`;
