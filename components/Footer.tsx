import { FooterContainer, FooterText, IconContainer, IconLink } from "@/styles/Footer.styled";
import {format} from "date-fns"
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
