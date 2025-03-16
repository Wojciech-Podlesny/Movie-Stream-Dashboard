import { FaSearch } from "react-icons/fa";
import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 3px solid black;
  border-radius: 15px;
  font-size: 16px;
  outline: none;
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
`;