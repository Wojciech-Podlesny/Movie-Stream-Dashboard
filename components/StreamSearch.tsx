import { Container, Input, SearchIcon } from "@/styles/StreamSearch.styled";
import { ChangeEvent, useState } from "react";

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
