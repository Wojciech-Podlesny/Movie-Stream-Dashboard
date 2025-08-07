import { Button } from "@mui/material";
import { styled } from "styled-components";

export const ToggleShowAllButton = styled(Button)`
  && {
    background-color: #00bfff;
    color: #ffffff;
    font-weight: 600;
    text-transform: none;
    padding: 12px 28px;
    border-radius: 40px;
    font-size: 1.05rem;
    box-shadow: 0 6px 20px rgba(0, 191, 255, 0.25);
    transition: all 0.3s ease;
    letter-spacing: 0.25px;

    &:hover {
      background-color: #0099e6;
      box-shadow: 0 8px 24px rgba(0, 170, 255, 0.3);
    }

    @media (max-width: 480px) {
      width: 100%;
      font-size: 1rem;
      padding: 10px 20px;
    }
  }
`;