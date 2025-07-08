"use client"

import styled from "styled-components"



const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fef2f2;
  padding: 2rem;
`

const Title = styled.h2`
  color: #b91c1c;
  font-size: 2rem;
  margin-bottom: 1rem;
`

const RetryButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc2626;
  }
`


export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {
  return (
    <Wrapper>
      <Title>Something went wrong!</Title>
      <RetryButton onClick={reset}>Try again</RetryButton>
    </Wrapper>
  );
}

