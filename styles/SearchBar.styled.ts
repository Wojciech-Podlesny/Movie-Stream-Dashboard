import { styled } from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 10px;  // tylko poziomy margines
`;

export const Input = styled.input`
  width: 100%;
  padding: 6px 35px 6px 10px;  // mniejszy padding (ok. 32-36px wysokości)
  border: 2px solid black;
  border-radius: 15px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;

export const SearchIcons = styled(SearchIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
`;
