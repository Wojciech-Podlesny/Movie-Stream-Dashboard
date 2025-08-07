// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/app/store/store";
// import { Footer } from "@/components/Footer";
// import { Navbar } from "@/components/Navbar";
// import { Sidebar } from "@/components/Sidebar";
// import { FavouritesList } from "@/components/FavouritesList";
// import { CircularProgress } from "@mui/material";
// import styled from "styled-components";
// import { MoviesFilterMenu } from "@/components/MediaFilterMenu";
// import { MoviesPagination } from "@/components/MediaPagination";
// import { getFilteredSeries, getSortedSeries } from "@/utils/filterSeries";
// import { SeriesGrid } from "@/components/SeriesGrid";
// import { fetchDiscoverSeries } from "../store/Media/discoverSLice";

// export const Container = styled.div`
// width: 1400px;
//   color: #fff;
//   background-color: #0d0d2f;
// `;


// export const Title = styled.h2`
//   font-size: 1.4rem;
//   font-weight: bold;
//   color: white;
//   display: flex;
//   gap: 10px;
// `;


// export const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 25px;
//   padding: 20px;
//   justify-content: center;
// `;

// export const Card = styled.div`
//   background-color: #0d0d2f;
//   border-radius: 8px;
//   overflow: hidden;
//   text-align: center;
//   position: relative;
//   cursor: pointer;
//   transition: transform 0.3s, box-shadow 0.3s;

//   &:hover {
//     transform: scale(1.05);
//     box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.3);
//   }
// `;

// export const SectionMenu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 20px;
//   padding: 25px 20px;
//   background-color: #0d0d2f;
//   border-radius: 8px;
// `;

// export const PosterWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 250px;
// `;
// const Section = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
// `;

// const SectionSeries = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const Series = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const {loading,error,discoverSeries,seriesPage,selectedCategory} = useSelector((state: RootState) => state.discover);
//   const { query } = useSelector((state: RootState) => state.search);
//   const [filter, setFilter] = useState<string>("");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
//   const [page, setPage] = useState<number>(1);

//   useEffect(() => {
//     dispatch(fetchDiscoverSeries(page));
//   }, [dispatch, page]);

//   const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   const filtered = getFilteredSeries(discoverSeries, selectedCategory, query);
//   const sorted = getSortedSeries(filtered, filter, sortDirection);

//   if (loading) {
//     return (
//       <Container>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (error) {
//     return <Container>{error}</Container>;
//   }

//   return (
//     <>
//       <Navbar />
//       <SectionSeries>
//         <Sidebar />
//         <Section>
//           <Container>
//             <MoviesFilterMenu setFilter={setFilter} setSortDirection={setSortDirection} />
//             <SeriesGrid series={sorted} />
//             <MoviesPagination
//               totalPages={10}
//               page={seriesPage}
//               onPageChange={handlePageChange}
//             />
//           </Container>
//           <FavouritesList />
//         </Section>
//       </SectionSeries>
//       <Footer />
//     </>
//   );
// };

// export default Series;


"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CircularProgress } from "@mui/material";
import { getFilteredSeries, getSortedSeries } from "@/utils/filterSeries";
import { SeriesGrid } from "@/components/SeriesGrid";
import { MoviesPagination } from "@/components/MediaPagination";
import { fetchDiscoverSeries } from "../store/Media/discoverSLice";
import { styled } from "styled-components";
import { MediaFilterButtons } from "@/components/MediaFilterButtons";

export const MoviePageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MoviePageSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const MoviePageContainer = styled.div`
  width: 2000px;
  color: #fff;
  background-color: #0d0d2f;
`;

export const MoviePageTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  display: flex;
  gap: 10px;
`;

export const MovieGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  padding: 20px;
  justify-content: center;
`;

export const MovieCard = styled.div`
  background-color: #0d0d2f;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.3);
  }
`;

export const MoviePageMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 20px;
  background-color: #0d0d2f;
  border-radius: 8px;
`;

export const MoviePosterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;

const Series = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    discoverSeries,
    loading,
    error,
    moviesPage,
    totalPagesSeries,
  } = useSelector((state: RootState) => state.discover);

  const { query } = useSelector((state: RootState) => state.search);

  const [filter, setFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (discoverSeries.length === 0) {
      dispatch(fetchDiscoverSeries(moviesPage));
    }
  }, [dispatch, discoverSeries.length, moviesPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchDiscoverSeries(value));
  };

  const filteredSeries = getFilteredSeries(discoverSeries, null, query);
  const sortedSeries = getSortedSeries(filteredSeries, filter, sortDirection);

  const safeTotalPages = Math.min(totalPagesSeries, 500);

  return (
    <div>
      <Navbar />

      <MoviePageWrapper>
        <MoviePageSection>
          <MoviePageContainer>
            <MoviePageMenu>
              <MoviePageTitle>Series</MoviePageTitle>
              <MediaFilterButtons
                sortDirection={sortDirection}
                setFilter={setFilter}
                setSortDirection={setSortDirection}
              />
            </MoviePageMenu>

            {loading && (
              <div style={{ padding: 20, display: "flex", gap: 12, alignItems: "center" }}>
                Loading movies... <CircularProgress size={20} />
              </div>
            )}

            {error && <div style={{ padding: 20 }}>{error}</div>}

            {!loading && !error && (
              <>
                  <SeriesGrid series={sortedSeries} showToggle={false} />
                <MoviesPagination
                  totalPages={safeTotalPages}
                  page={moviesPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </MoviePageContainer>
        </MoviePageSection>
      </MoviePageWrapper>

      <Footer />
    </div>
  );
};

export default Series;
