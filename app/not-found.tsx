"use client"

import styled from "styled-components"
import Link from "next/link"

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f4f8;
  text-align: center;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
`

const StyledLink = styled(Link)`
  font-size: 1.125rem;
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 2px solid #3b82f6;
    color: #1d4ed8;
  }
`


const NotFound = () => {
  return (
    <Wrapper>
      <Title>404 - Page Not Found</Title>
      <StyledLink href="/">← Back to Home</StyledLink>
    </Wrapper>
  )
}

export default NotFound

