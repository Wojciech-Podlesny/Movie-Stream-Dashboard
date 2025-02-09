import {format} from "date-fns"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { styled } from "styled-components";

const FooterContainer = styled.footer`
  background-color: #0d0d1d;
  color: white;
  grid-column: 1 / 6;
  grid-row: 10 / 11;

  @media (min-width: 1024px) {
    grid-row: 7 / 8;
  }

  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
`;

const FooterText = styled.h1`
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 1.125rem;

  @media (min-width: 768px) {
    width: auto;
    margin: 0 auto;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconLink = styled.a`
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  margin: 0 0.5rem;

  &:hover,
  &:focus {
    transform: scale(1.1);
    color: #1d4ed8;
  }
`;

export const Footer = () => {
  const currentYear = format(new Date(), "yyyy");

  return (
    <FooterContainer>
      <FooterText data-testid="footer-info">
        &copy; {currentYear} Wojciech Podleśny
      </FooterText>
      <IconContainer>
        <IconLink
          data-testid="linkedin-link"
          href="https://www.linkedin.com/in/wojciech-podlesny"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linkedin"
        >
          <FaLinkedin size="1.5em" data-testid="linkedins-link" />
        </IconLink>
        <IconLink
          data-testid="github-link"
          href="https://github.com/wojciech-podlesny"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size="1.5em" data-testid="githubs-link" />
        </IconLink>
      </IconContainer>
    </FooterContainer>
  );
};
