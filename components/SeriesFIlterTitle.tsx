import MovieIcon from '@mui/icons-material/Movie';
import { styled } from 'styled-components';

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    gap: 8px;
  }
`;

const StyledMovieIcon = styled(MovieIcon)`
  color: #ffffff;
  font-size: 2rem !important;

  @media (max-width: 480px) {
    font-size: 1.5rem !important;
  }
`;

export const SeriesFilterTitle = () => (
  <Title>
    <StyledMovieIcon />
    Series
  </Title>
);
