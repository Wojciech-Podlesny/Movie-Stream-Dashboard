"use client";
import styled, { createGlobalStyle } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Movie } from "@/types";

const GlobalSwiperFix = createGlobalStyle`
  .swiper {
    width: 100%;
  }

   .swiper-button-prev, 
  .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    color: #fff;
    z-index: 11;
  }

  .swiper-button-prev {
    left: calc((100% - 80%) / 7 - 40px); 
  }

  .swiper-button-next {
    right: calc((100% - 80%) / 6 - 40px); 
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    .swiper-button-prev,
    .swiper-button-next {
      display: none;
    }
  }
`;

const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;


const InnerCarouselWrapper = styled.div`
  width:80%;
  position: relative;
`;


const SlideWrapper = styled.div`
  width: 90%;
`;


const MoviePoster = styled.img`
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;


type MovieCarouselProps = {  //to other files
  movies: Movie[];
};


export const MovieCarousel = ({ movies }: MovieCarouselProps) => {
  return (
    <>
      <GlobalSwiperFix />
      <OuterWrapper>
        <InnerCarouselWrapper>
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            grabCursor={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
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
