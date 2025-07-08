




"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

import { Movie } from "@/types/models";
import { removeFromFavourites, subscribeToFavourites } from "@/lib/services/favouritesService";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #0d0d1d;
  padding: 40px 20px;
`;

const List = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
`;

const Heading = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
  grid-column: 1 / -1;
  text-align: center;
`;

const MovieItem = styled.div`
  position: relative;
  color: white;
  text-align: center;
`;

const Poster = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: rgba(255, 0, 0, 0.8);
  border: none;
  border-radius: 50%;
  color: white;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FavouritesList = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const isAuthenticated = status === "authenticated";
  const [favourites, setFavourites] = useState<Movie[]>([]);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = subscribeToFavourites(userId, setFavourites);
    return () => unsubscribe();
  }, [userId]);

  const handleRemove = async (id: number) => {
    if (userId) {
      await removeFromFavourites(userId, id);
    }
  };

  if (!isAuthenticated) {
    return <p style={{ color: "white" }}>Zaloguj się, aby zobaczyć ulubione</p>;
  }

  return (
    <Wrapper>
      <List>
        <Heading>Twoje ulubione</Heading>
        {favourites.map((movie) => (
          <MovieItem key={movie.id}>
            <Tooltip title="Usuń">
              <RemoveButton onClick={() => handleRemove(movie.id)}>
                <CloseIcon fontSize="small" />
              </RemoveButton>
            </Tooltip>
            <Poster
              src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
              alt={movie.title}
              width={100}
              height={150}
            />
            <p>{movie.title}</p>
          </MovieItem>
        ))} 

          {/* {favourites.map((movie) => {
            console.log("Render: movie",movie)
            return (
               <MovieItem key={movie.id}>
            <Tooltip title="Usuń">
              <RemoveButton onClick={() => handleRemove(movie.id)}>
                <CloseIcon fontSize="small" />
              </RemoveButton>
            </Tooltip>
            <Poster
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width={100}
              height={150}
            />
            <p>{movie.title}</p>
          </MovieItem>
            )
          }
        )} */}
      </List>
    </Wrapper>
  );
};



// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import { styled } from "styled-components";
// import Image from "next/image";
// import { RootState, AppDispatch } from "@/app/store/store";
// import { removeFavorite } from "@/app/store/Media/favouritesSlice";
// import CloseIcon from "@mui/icons-material/Close";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import { Tooltip } from "@mui/material";
// import { useState } from "react";
// import { useSession } from "next-auth/react";

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   background-color: #0d0d1d;
//   padding: 40px 20px;
// `;

// const List = styled.div`
//   max-width: 1200px;
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
//   gap: 20px;
//   justify-content: center;
// `;

// const Heading = styled.h2`
//   color: white;
//   font-size: 24px;
//   font-weight: 700;
//   margin: 0 0 20px 0;
//   grid-column: 1 / -1;
//   text-align: center;
// `;

// const EmptyWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 10px 20px;
//   color: white;
//   text-align: center;
// `;

// const EmptyText = styled.p`
//   margin-top: 12px;
//   font-size: 18px;
//   font-weight: 500;
//   color: white;
// `;


// const MovieItem = styled.div<{ isRemoving?: boolean }>`
//   position: relative;
//   padding: 10px;
//   text-align: center;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   transition: all 0.25s ease;

//   opacity: ${(props) => (props.isRemoving ? 0 : 1)};
//   transform: ${(props) => (props.isRemoving ? "scale(0.95)" : "scale(1)")};

//   &:hover {
//     transform: scale(1.03);
//     box-shadow: 0 6px 14px rgba(0,0,0,0.5);
//   }
// `;

// const Poster = styled(Image)`
//   border-radius: 8px;
//   object-fit: cover;
// `;

// const Title = styled.p`
//   margin-top: 10px;
//   font-size: 16px;
//   font-weight: 600;
//   color: #ffffff;
//   text-align: center;
//   line-height: 1.4;
//   max-width: 100%;
//   word-break: break-word;
//   text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.7);

//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   overflow: hidden;

//   ${MovieItem}:hover & {
//     color: #ffd700;
//   }
// `;

// const RemoveButton = styled.button`
//   position: absolute;
//   top: 6px;
//   right: 6px;
//   background-color: rgba(255, 0, 0, 0.8);
//   border: none;
//   border-radius: 50%;
//   color: white;
//   width: 28px;
//   height: 28px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: background-color 0.2s ease, transform 0.2s ease;

//   &:hover {
//     background-color: rgba(200, 0, 0, 0.9);
//     transform: scale(1.1);
//   }
// `;

// const AddFavouritesIcon = styled(BookmarkBorderIcon)`
//   color: white; 
//   font-size: 44px;
//   cursor: pointer;
//   transition: color 0.2s ease;
// `;
// export const FavouritesList = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const favourites = useSelector((state: RootState) => state.favourites.items);
  
//   const { status } = useSession();
//   const isAuthenticated = status === "authenticated";
//   const [removingId, setRemovingId] = useState<number | null>(null);

//   const handleRemove = (id: number) => {
//     setRemovingId(id);
//     setTimeout(() => {
//       dispatch(removeFavorite(id));
//       setRemovingId(null);
//     }, 250);
//   };

//   if (!isAuthenticated) {
//     return (
//       <Wrapper>
//         <EmptyWrapper>
//           <EmptyText>You must be logged in to see your favourites.</EmptyText>
//         </EmptyWrapper>
//       </Wrapper>
//     );
//   }

//   return (
//     <Wrapper>
//       <List>
//         <Heading>Favourites</Heading>
//         {favourites.length === 0 ? (
//           <EmptyWrapper>
//             <AddFavouritesIcon />
//             <EmptyText>No favourite movies yet.</EmptyText>
//           </EmptyWrapper>
//         ) : (
//           favourites.map((movie) => (
//             <MovieItem key={movie.id} isRemoving={removingId === movie.id}>
//               <Tooltip title="Remove" placement="top">
//                 <RemoveButton onClick={() => handleRemove(movie.id)}>
//                   <CloseIcon style={{ fontSize: "16px" }} />
//                 </RemoveButton>
//               </Tooltip>
//               <Poster
//                 src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
//                 alt={movie.title}
//                 width={100}
//                 height={150}
//               />
//               <Title>{movie.title}</Title>
//             </MovieItem>
//           ))
//         )}
//       </List>
//     </Wrapper>
//   );
// };
