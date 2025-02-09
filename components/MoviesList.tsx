import { useMovies } from "@/hooks/useContext";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: black;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); // Dokładnie 6 kolumn w rzędzie
  gap: 15px;
  justify-content: center;
`;

const Pp = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
`;

const Card = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

// const MovieTitle = styled.p`
//   font-size: 1rem;
//   padding: 10px;
//   color: #d3c3c3;
//   font-weight: 500;
// `;

export const MoviesList = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <Container>Ładowanie filmów...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Pp>
        <Title>Films</Title>
        <Title>Latest</Title>
        <Title>Best advised</Title>
        <Title>Rating</Title>
         <button>View more</button>
      </Pp>

      <Grid>
        {movies.slice(0,18).map((movie) => (
          <Card key={movie.id}>
            <Poster
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            {/* <MovieTitle>{movie.title}</MovieTitle> */}
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
