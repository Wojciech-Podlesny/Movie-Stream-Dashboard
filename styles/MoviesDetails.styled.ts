import { styled } from "styled-components";


export const SectionMovies = styled("div")`
  display: flex;
  justify-content: center;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const COnt = styled.div`
  display: flex;
  justify-content: center;
`;

export const DetailsLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin: 20px 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MovieInfo = styled.div`
  max-width: 600px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
`;

export const PosterWrapper = styled.div`
  flex-shrink: 0;
  padding-left: 80px;
`;

export const TrailerWrapper = styled.div`
  margin-top: 40px;
`;

export const Title1 = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: white;
  display: flex;
  gap: 10px;
`;
export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: normal;
  color: white;
  display: flex;
  gap: 10px;
`;

export const SectionTitleOverview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 40px;
`;