"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Movie } from "@/types";
import { InnerCarouselWrapper, MoviePoster, OuterWrapper, SlideWrapper } from "@/styles/MoviesCarousel.styled";

type MovieCarouselProps = {
  movies: Movie[];
};

export const MovieCarousel = ({ movies }: MovieCarouselProps) => {
  return (
    <>
      <OuterWrapper>
        <InnerCarouselWrapper>
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            grabCursor={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <SlideWrapper>
                  <MoviePoster
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </SlideWrapper>
              </SwiperSlide>
            ))}
          </Swiper>
        </InnerCarouselWrapper>
      </OuterWrapper>
    </>
  );
};
