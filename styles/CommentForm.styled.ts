import { Button } from "@mui/material";
import { keyframes, styled } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 16px;
  color: white;
  max-width: 800px;
  margin: 80px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 24px;
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 6px;
  margin: 10px 0 20px;
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(to right, #facc15, #f59e0b);
  color: white;
  border-radius: 9999px;
  font-weight: bold;
  margin-top: 25px;
  padding: 8px 24px;
  &:hover { background: linear-gradient(to right, #fbbf24, #f59e0b); }
`;

export const CommentsList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CommentItem = styled.div`
  background: #2e2e2e;
  padding: 16px;
  border-radius: 12px;
  animation: ${fadeInUp} 0.4s ease forwards;
`;

export const CommentHeader = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
  color: #999;
  strong { color: #facc15; }
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: 15px;
  color: #ddd;
`;

export const NoComment = styled.p`
  text-align: center;
  color: #aaa;
  margin-top: 30px;
  font-style: italic;
`;
