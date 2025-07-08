"use client"

import { useEffect } from "react"
import styled from "styled-components"


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #fdf2f2;
  padding: 2rem;
  text-align: center;
`

const Title = styled.h2`
  color: #b91c1c;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`

const RetryButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dc2626;
  }
`


export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Wrapper>
      <Title>Something went wrong!</Title>
      <RetryButton onClick={reset}>Try again</RetryButton>
    </Wrapper>
  );
}

