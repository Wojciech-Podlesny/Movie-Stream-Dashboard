import { styled } from "styled-components";

export const MediaFilterBarWrapper = styled.div`
  width: 100%;
  background-color: #0e0e2b;
`;

export const MediaFilterTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 200px;
  padding: 16px;

  @media (min-width: 769px) {
    padding-bottom: 0;
  }
`;

export const MediaFilterMobileToggle = styled.button`
  display: block;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MediaFilterDrawerOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const MediaFilterDrawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 50vh;
  width: 100%;
  background-color: #0e0e2b;
  z-index: 1000;
  padding: 16px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MediaFilterDrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 48px;
`;

export const MediaFilterCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
`;

export const MediaFilterMobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 16px;
  margin-top: 24px;
`;

export const MediaFilterDesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 10px;
    background-color: #0e0e2b;
  }
`;
