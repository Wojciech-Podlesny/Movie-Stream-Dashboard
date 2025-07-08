import { Box, Button, Container } from "@mui/material";
import { styled } from "styled-components";

export const Background = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const StyledContainer = styled(Container)`
  background-color: #2c2c2c;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const GradientButton = styled(Button)`
  background: linear-gradient(90deg, #fbc531, #e58e26);
  color: white;
  padding: 15px;
  border-radius: 30px;
  font-weight: bold;
  text-transform: none;
  margin-top: 10px;

  &:hover {
    background: linear-gradient(90deg, #e1a32a, #d17a20);
  }
`;

export const Label = styled.label`
  color: white;
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
