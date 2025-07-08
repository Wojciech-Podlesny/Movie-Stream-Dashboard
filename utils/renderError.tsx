import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Container } from "@/styles/PopularMovies.styled";
import CircularProgress from "@mui/material/CircularProgress";

export const renderLoading = () => (
  <Container>
    <Navbar />
    Loading details movies... <CircularProgress />
    <Footer />
  </Container>
);

export const renderError = (error: string | null) => (
  <Container>
    <Navbar />
    <p>{error || "Not found details movies..."}</p>
    <Footer />
  </Container>
);



  // if (loading) return <Container>Loading movies... <CircularProgress /></Container>;
  // if (error) return <Container>{error}</Container>;


  