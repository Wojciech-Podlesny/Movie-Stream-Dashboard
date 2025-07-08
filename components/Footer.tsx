import { FooterContainer, FooterText, IconContainer, IconLink } from "@/styles/Footer.styled";
import {format} from "date-fns"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
          <LinkedInIcon fontSize="large" />
        </IconLink>
        <IconLink
          data-testid="github-link"
          href="https://github.com/wojciech-podlesny"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon fontSize="large" />
        </IconLink>
      </IconContainer>
    </FooterContainer>
  );
};
