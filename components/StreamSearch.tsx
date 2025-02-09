import { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 3px solid black;
  border-radius: 15px;
  font-size: 16px;
  outline: none;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
`;

export const StreamSearch = () => {
  const [value, setValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = () => {
    console.log("Hello");
  };

  return (
    <Container>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter movies"
      />
      <SearchIcon />
    </Container>
  );
};
