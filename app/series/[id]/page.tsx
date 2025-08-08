"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { fetchSeriesDetails, resetSeriesDetails } from "@/app/store/Media/detailsSeriesSlice";
import { MoviesTrailer } from "@/components/MediaTrailer";
import { ErrorState, LoadingState } from "@/utils/renderStates";
import { MoviesDetailsSection } from "@/components/MoviesDetailsSection";
import { CommentForm } from "@/components/CommentForm";
import { MediaWrapper, SectionMain, SectionMedia, SectionMediaDetails, TrailerContainer } from "@/styles/MediaDetailsPage.styled";


const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { series, loading, error } = useSelector((state: RootState) => state.seriesDetails);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchSeriesDetails({ seriesId: id }));
    }
    return () => {
      dispatch(resetSeriesDetails());
    };
  }, [dispatch, id]);

  if (loading) return <LoadingState message="Loading" />;
  if (error || !series) return <ErrorState message={error} />;

  return (
    <>
      <Navbar />
      <SectionMediaDetails leftCol={sidebarOpen ? 250 : 60}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />
        <SectionMedia>
          <SectionMain>
            <MediaWrapper>
              <MoviesDetailsSection
                posterPath={series.poster_path}
                title={series.name}
                releaseDate={series.first_air_date}
                voteAverage={series.vote_average}
                overview={series.overview}
                id={series.id}
              />
              <TrailerContainer>
                <MoviesTrailer movieTitle={series.name} />
              </TrailerContainer>
              <CommentForm itemId={id} type="series" />
            </MediaWrapper>
          </SectionMain>
        </SectionMedia>
        <FavouritesList />
      </SectionMediaDetails>
      <Footer />
    </>
  );
};

export default SeriesDetails;
