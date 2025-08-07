"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircularProgress } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { fetchSeriesDetails, resetSeriesDetails } from "@/app/store/Media/detailsSeriesSlice";
import { MoviesTrailer } from "@/components/MediaTrailer";
import { styled } from "styled-components";
import { SeriesDetailsSection } from "@/components/SeriesDetailsSection";


export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  color: #fff;
  background-color: #0d0d2f;
  border-bottom: 1px solid white;
  padding: 0 10px;

  @media (max-width: 480px) {
    padding: 0 6px;
  }
`;


export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const COnt = styled.div`
  display: flex;
  justify-content: center;
`;

export const DetailsLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin: 20px 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MovieInfo = styled.div`
  max-width: 600px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
`;

export const PosterWrapper = styled.div`
  flex-shrink: 0;
  padding-left: 80px;
`;

export const TrailerWrapper = styled.div`
  margin-top: 40px;
`;

export const Title1 = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: white;
  display: flex;
  gap: 10px;
`;
export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: normal;
  color: white;
  display: flex;
  gap: 10px;
`;

export const SectionTitleOverview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 40px;
`;



const SectionMovies = styled("div")`
  display: flex;
  justify-content: center;
`;


const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const { series, loading, error } = useSelector((state: RootState) => state.seriesDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchSeriesDetails({ seriesId: id }));
    }

    return () => {
      dispatch(resetSeriesDetails());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container>
        <Navbar />
        Loading details movies... <CircularProgress />
        <Footer />
      </Container>
    );
  }

  if (error || !series) {
    return (
      <Container>
        <Navbar />
        <p>{error || "Not found details movies..."}</p>
        <Footer />
      </Container>
    );
  }
  return (
    <>
      <Navbar />
      <SectionMovies>
        <Sidebar />
        <Section>
          <Container>
            <SeriesDetailsSection
              posterPath={series.poster_path}
              title={series.name}
              releaseDate={series.first_air_date}
              voteAverage={series.vote_average}
              overview={series.overview} id={0}            />
            <TrailerWrapper>
              <MoviesTrailer movieTitle={series.name} />
            </TrailerWrapper>
          </Container>
          <FavouritesList />
        </Section>
      </SectionMovies>
      <Footer />
    </>
  );
};

export default SeriesDetails;

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/app/store/store";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { MoviesTrailer } from "@/components/MediaTrailer";
// import {
//   fetchMoviesDetails,
//   resetMoviesDetails,
// } from "@/app/store/Media/detailsMoviesSlice";
// import { renderError, renderLoading } from "@/utils/renderError";
// import { styled } from "styled-components";
// import { CommentForm } from "@/components/CommentForm";
// import { MoviesDetailsSection } from "@/components/MoviesDetailsSection";
// import { Sidebar } from "@/components/Sidebar";
// import { FavouritesList } from "@/components/FavouritesList";

// // --- Styled Components (unchanged from your version except SectionX at the end) ---
// const SectionMovies = styled("div")`
//   display: flex;
//   justify-content: center;
// `;

// const Section = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
// `;

// const TrailerWrapper = styled.div`
//   margin-top: 40px;
// `;

// export const Container = styled.div`
//   width: 100%;
//   max-width: 1700px;
//   color: #fff;
//   background-color: #0d0d2f;
//   border-bottom: 1px solid white;
//   padding: 0 10px;

//   @media (max-width: 480px) {
//     padding: 0 6px;
//   }
// `;

// // ... other styled components from your original code ...

// const SectionX = styled.div<{ leftCol?: number }>`
//   display: grid;
//   grid-template-columns: ${({ leftCol = 250 }) => `${leftCol}px 1fr 250px`};
//   grid-template-areas: "left content right";
//   flex: 1;
//   min-height: 100vh;
//   transition: grid-template-columns 0.3s ease;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     grid-template-areas: "content";
//   }
// `;

// const MovieDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const { movie, loading, error } = useSelector(
//     (state: RootState) => state.moviesDetails
//   );

//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchMoviesDetails({ movieId: id }));
//     }
//     return () => {
//       dispatch(resetMoviesDetails());
//     };
//   }, [dispatch, id]);

//   if (loading) return renderLoading();
//   if (error || !movie) return renderError(error);

//   return (
//     <>
//       <Navbar />
//       <SectionX leftCol={sidebarOpen ? 250 : 60}>
//         <Sidebar
//           isOpen={sidebarOpen}
//           onToggle={() => setSidebarOpen((prev) => !prev)}
//         />
//         <SectionMovies>
//           <Section>
//             <Container>
//               <MoviesDetailsSection
//                 posterPath={movie.poster_path}
//                 title={movie.title}
//                 releaseDate={movie.release_date}
//                 voteAverage={movie.vote_average}
//                 overview={movie.overview}
//                 id={movie.id}
//               />
//               <TrailerWrapper>
//                 <MoviesTrailer movieTitle={movie.title} />
//               </TrailerWrapper>
//               <CommentForm itemId={id} type="movie" />
//             </Container>
//           </Section>
//         </SectionMovies>
//         <FavouritesList />
//       </SectionX>
//       <Footer />
//     </>
//   );
// };

// export default MovieDetails;
