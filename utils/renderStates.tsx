// export const renderLoading = () => (
//   <Container>
//     <Navbar />
//     Loading details movies... <CircularProgress />
//     <Footer />
//   </Container>
// );

// export const renderError = (error: string | null) => (
//   <Container>
//     <Navbar />
//     <p>{error || "Not found details movies..."}</p>
//     <Footer />
//   </Container>
// );



//   // if (loading) return <Container>Loading movies... <CircularProgress /></Container>;
//   // if (error) return <Container>{error}</Container>;


import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  padding: 16px;
`;

const MessageText = styled.p<{ isError?: boolean }>`
  margin: 0;
  color: ${({ isError }) => (isError ? "#dc2626" : "inherit")};
  font-weight: ${({ isError }) => (isError ? "bold" : "normal")};
`;

export const LoadingState = ({ message }: { message: string }) => (
  <Wrapper>
    <MessageText>{message}</MessageText>
    <CircularProgress size={20} />
  </Wrapper>
);

export const ErrorState = ({ message }: { message: string | null }) => (
  <Wrapper>
    <MessageText isError>{message}</MessageText>
  </Wrapper>
);

  