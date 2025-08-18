import { styled } from "styled-components";

export const CategoriesContainer = styled.div`
  background-color: #121212;
  padding: 30px 20px;
  max-width: 280px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: none;
    padding: 8px 12px;
    gap: 12px;
  }
`;

export const SidebarInner = styled.div`
  min-height: 100vh;
  background: rgba(13, 13, 29, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    min-height: auto;
    background: transparent;
    padding: 0;
    overflow: visible;
    align-items: stretch;
    gap: 8px;
  }
`;

export const ToggleButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
    align-self: flex-start; 
  }
`;