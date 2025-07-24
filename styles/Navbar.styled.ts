import { styled } from "styled-components";

export const NavbarContainer = styled.div`  //to other files
  background-color: rgba(13, 13, 29, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  min-height: 64px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    text-decoration: none;
  }
`;

export const MobileIcons = styled.div`
  display: flex;
  gap: 8px;

  @media (min-width: 769px) {
    display: none;
  }
`;