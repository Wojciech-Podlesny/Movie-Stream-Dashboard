import {styled}  from "styled-components";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";



export const SectionHeaderContainer = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
  padding: 16px;
  border-radius: 12px;
`;

const iconStyles = `
  font-size: 2rem;
  color: #ffffff;
`;

export const MovieIconStyled = styled(MovieIcon)`
  ${iconStyles}
`;

export const SeriesIconStyled = styled(TvIcon)`
  ${iconStyles}
`;
