import { Button } from "@mui/material";
import { styled } from "styled-components";

type Props = {
  showAll: boolean;
  toggleShowAll: () => void;
};

const StyledButton = styled(Button)`
  && {
    background-color: #0099ff;
    color: #fff;
    font-weight: 600;
    text-transform: none;
    padding: 10px 26px;
    border-radius: 30px;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0, 170, 255, 0.2);
    transition: background 0.3s ease;

    &:hover {
      background-color: #00bfff;
    }

    @media (max-width: 480px) {
      width: 100%;
      font-size: 0.95rem;
      padding: 10px 20px;
    }
  }
`;

export const MediaShowAllButton = ({ showAll, toggleShowAll }: Props) => (
  <StyledButton onClick={toggleShowAll}>
    {showAll ? "Show Less" : "Show More"}
  </StyledButton>
);
