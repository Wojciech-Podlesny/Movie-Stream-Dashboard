import styled from "styled-components";

export const StyledSection = styled.section`
  border-bottom: 1px solid white;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledSectionContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  background-color: #0d0d2f;
  color: #fff;
  border-radius: 10px;
  padding: 20px;

  @media (min-width: 768px) {
    width: 1600px;
    padding: 30px;
  }
`;

export const StyledSectionHeading = styled.h2`
  padding-bottom: 20px;
  font-size: 23px;
  font-weight: 700;
  color: white;
  margin: 0;
`;
