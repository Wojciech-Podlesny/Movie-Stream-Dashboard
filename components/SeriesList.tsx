import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchMoviesInitial } from "@/app/store/moviesSlice";
import { useEffect, useState } from "react";
import { ImVideoCamera } from "react-icons/im";

import { styled } from "styled-components";
import { Card, Grid, PosterWrapper, SectionMenu, Title } from "@/styles/MoviesLIst.styled";
import { Container } from "@/styles/SeriesList.styled";
import Link from "next/link";


const ButtonViewMore = styled.button`
  background-color: blue;
  color: wheat;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;

`
const SectionButton = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`

const SectionTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 20px;
`


export const SeriesList = () => {
  const {error,loading,series} = useSelector((state: RootState) => state.movies)
  const dispatch = useDispatch<AppDispatch>()
  const [showAllSeries,setShowAllSeries] = useState<boolean>(false)

  const displayMoreSeries = showAllSeries ? series: series.slice(0,10)

  useEffect(() => {
    dispatch(fetchMoviesInitial())
  }, [dispatch])
  

  if (loading) return <Container>Loading series...</Container>;
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
               <ButtonViewMore onClick={() => setShowAllSeries(!showAllSeries)}>
                 {showAllSeries ? "Show Less" : "View More"}
               </ButtonViewMore>
             </SectionButton>
           </SectionMenu>
     
      <Grid>
        {displayMoreSeries.map((series) => (
          <Card key={series.id}>
            <PosterWrapper>
            <Link href={`/series/${series.id}`}>
            <Image
                src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                alt={series.name}
                fill
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              /></Link>
            </PosterWrapper>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
