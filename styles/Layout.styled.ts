import { styled } from "styled-components";

export const PageWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-template-areas: "left content right";
  flex: 1;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: "content";
  }
`;

export const LeftSidebar = styled.aside`
  grid-area: left;
  position: sticky;
  top: 0;
  background: #0d0d1d;
  z-index: 998;
  width: 80px;
  height: 10vh;
  border-bottom-right-radius: 70px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightSidebar = styled.aside`
  grid-area: right;
  position: sticky;
  top: 30px;
  background: rgba(13, 13, 29, 0.8);
  z-index: 998;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ContentArea = styled.main`
  grid-area: content;
  min-height: 100vh;
`;

export const Section = styled.section`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;

  @media (min-width: 768px) {
    display: none;
  }
`;