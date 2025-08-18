
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MediaTrailer } from "@/components/MediaTrailer";
import { ErrorState, LoadingState } from "@/utils/renderStates";
import { CommentForm } from "@/components/CommentForm";
import { Sidebar } from "@/components/Sidebar";
import { FavouritesList } from "@/components/FavouritesList";
import { fetchSeriesDetails, resetSeriesDetails } from "@/app/store/Media/detailsSeriesSlice";
import { SeriesDetailsSection } from "@/components/SeriesDetailsSection";
import { DesktopSectionFavouritesList, MediaWrapper, SectionMain, SectionMedia, SectionMediaDetails, TrailerContainer } from "@/styles/MediaDetailsPage.styled";


const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { series, loading, error } = useSelector(
    (state: RootState) => state.seriesDetails
  );
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
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />

        <SectionMedia>
          <SectionMain>
            <MediaWrapper>
              <SeriesDetailsSection
                posterPath={series.poster_path}
                title={series.name}
                first_air_date={series.first_air_date}
                voteAverage={series.vote_average}
                overview={series.overview}
                id={series.id}
              />

              <TrailerContainer>
                <MediaTrailer movieTitle={series.name} />
              </TrailerContainer>

              <CommentForm itemId={id} type="series" />
            </MediaWrapper>
          </SectionMain>
        </SectionMedia>

        <DesktopSectionFavouritesList>
          <FavouritesList />
        </DesktopSectionFavouritesList>
      </SectionMediaDetails>
      <Footer />
    </>
  );
};

export default SeriesDetails;
