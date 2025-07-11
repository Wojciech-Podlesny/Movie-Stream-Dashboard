// // "use client";
// // import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// // import { useDispatch, useSelector } from "react-redux";
// // import { RootState, AppDispatch } from "@/app/store/store";
// // import { styled } from "styled-components";
// // import { addFavorite, removeFavorite } from "@/app/store/Media/favouritesSlice";

// // type Movie = {
// //   id: number;
// //   title: string;
// //   posterPath: string;
// //   releaseDate: string;
// //   voteAverage: number;
// //   overview: string;
// // };

// // const HeartButton = styled.button`
// //   position: absolute;
// //   top: 8px;
// //   right: 8px;
// //   background: transparent;
// //   border: none;
// //   color: white;
// //   font-size: 24px;
// //   cursor: pointer;
// //   z-index: 10;

// //   &:hover {
// //     transform: scale(1.1);
// //   }
// // `;

// // type Props = {
// //   movie: Movie;
// // };

// // export const FavoriteToggleIcon = ({ movie }: Props) => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const favorites = useSelector((state: RootState) => state.favourites.items);
// //   const isFavorite = favorites.some((m) => m.id === movie.id);

// //   const toggleFavorite = () => {
// //     if (isFavorite) {
// //       dispatch(removeFavorite(movie.id));
// //     } else {
// //       dispatch(addFavorite(movie));
// //     }
// //   };

// //   return (
// //     <HeartButton onClick={toggleFavorite}>
// //       {isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart color="white" />}
// //     </HeartButton>
// //   );
// // };

// "use client";

// import { styled } from "styled-components";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useSession } from "next-auth/react";

// import { useState, useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";

// import { Movie } from "@/types";
// import { addToFavourites, removeFromFavourites } from "@/lib/services/favouritesService";
// import { db } from "@/lib/firebase/firebase";

// const HeartButton = styled.button`
//   position: absolute;
//   top: 8px;
//   right: 8px;
//   background: transparent;
//   border: none;
//   color: white;
//   font-size: 24px;
//   cursor: pointer;
//   z-index: 10;

//   &:hover {
//     transform: scale(1.1);
//   }

//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }
// `;

// type Props = {
//   movie: Movie;
// };

// export const FavoriteToggleIcon = ({ movie }: Props) => {
//   const { data: session, status } = useSession();
//   const isAuthenticated = status === "authenticated";
//   const userId = session?.user?.id;

//   const [isFavorite, setIsFavorite] = useState(false);


//   useEffect(() => {
//     let isMounted = true;
//     const checkFavorite = async () => {
//       if (!isAuthenticated || !userId) return;
//       const docRef = doc(db, "users", userId, "favourites", movie.id.toString());
//       const docSnap = await getDoc(docRef);
//       if (isMounted) {
//         setIsFavorite(docSnap.exists());
       
//       }
//     };

//     checkFavorite();

//     return () => {
//       isMounted = false;
//     };
//   }, [isAuthenticated, userId, movie.id]);
  
// const toggleFavorite = async () => {
//   console.log("Clicked favorite:", movie);
//   if (!userId) {
//     console.warn("Brak userId – nie dodano do ulubionych");
//     return;
//   }

//   try {
//     if (isFavorite) {
//       console.log("Removing from favourites...");
//       await removeFromFavourites(userId, movie.id);
//       setIsFavorite(false);
//     } else {
//       console.log("Adding to favourites...");
//       await addToFavourites(userId, movie);
//       setIsFavorite(true);
//     }
//   } catch (error) {
//     console.error("Firestore error:", error);
//   }
// };


//   if (!isAuthenticated) {
//     return (
//       <HeartButton title="Log in to add to favourites" disabled>
//         <AiOutlineHeart color="gray" />
//       </HeartButton>
//     );
//   }

//   return (
//     <HeartButton onClick={toggleFavorite} title={isFavorite ? "Remove from favourites" : "Add to favourites"}>
//       {isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart color="white" />}
//     </HeartButton>
//   );
// };
