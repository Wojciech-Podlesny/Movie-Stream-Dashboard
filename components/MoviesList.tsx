import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store/store";
import { fetchMoviesInitial } from "@/app/store/moviesSlice";
import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Grid,
  PosterWrapper,
  SectionMenu,
  Title,
} from "@/styles/MoviesLIst.styled";
import { ImVideoCamera } from "react-icons/im";
import { styled } from "styled-components";
import Link from "next/link";

const SectionButton = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 20px;
`;
const ButtonViewMore = styled.button`
  background-color: blue;
  color: wheat;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
`;
export const MoviesList = () => {
  const { error, loading, movies } = useSelector(
    (state: RootState) => state.movies
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showAllMovies, setShowAllMovies] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchMoviesInitial());
  }, [dispatch]);

  const displayMoreMovies = showAllMovies ? movies : movies.slice(0, 10);

  if (loading) return <Container>Loading movies...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <SectionMenu>
        <SectionTitle>
          <Title>
            <ImVideoCamera size={25} />
            Films
          </Title>
          <Title>Latest</Title>
          <Title>Best advised</Title>
          <Title>Rating</Title>
        </SectionTitle>
        <SectionButton>
          <ButtonViewMore onClick={() => setShowAllMovies(!showAllMovies)}>
            {showAllMovies ? "Show Less" : "View More"}
          </ButtonViewMore>
        </SectionButton>
      </SectionMenu>

      <Grid>
        {displayMoreMovies.map((movie) => (
          <Card key={movie.id}>
            <PosterWrapper>
              <Link href={`/movies/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
            </PosterWrapper>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
