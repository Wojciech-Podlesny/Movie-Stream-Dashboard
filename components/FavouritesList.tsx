// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import styled from "styled-components";
// import Image from "next/image";
// import CloseIcon from "@mui/icons-material/Close";
// import { Tooltip } from "@mui/material";

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   background-color: #0d0d1d;
//   padding: 40px 20px;
// `;

// const List = styled.div`
//   max-width: 1200px;
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
//   gap: 20px;
// `;

// const Heading = styled.h2`
//   color: white;
//   font-size: 24px;
//   font-weight: bold;
//   grid-column: 1 / -1;
//   text-align: center;
// `;

// const MovieItem = styled.div`
//   position: relative;
//   color: white;
//   text-align: center;
// `;

// const Poster = styled(Image)`
//   border-radius: 8px;
//   object-fit: cover;
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
// `;

// export const FavouritesList = () => {
//   const { data: session, status } = useSession();
//   type FavouriteItem = {
//     itemId: string;
//     poster_path: string;
//     title: string;
//   };

//   const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (!session?.user?.idToken) return;
//       const res = await fetch("/api/account/favourites", {
//         headers: {
//           Authorization: `Bearer ${session.user.idToken}`,
//         },
//       });
//       const data = await res.json();
//       setFavourites(data);
//     };

//     if (status === "authenticated") {
//       fetchFavorites();
//     }
//   }, [session?.user?.idToken, status]);

//   const handleRemove = async (itemId: string) => {
//     if (!session?.user?.idToken) return;
//     await fetch("/api/account/favourites", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session.user.idToken}`,
//       },
//       body: JSON.stringify({ itemId }),
//     });
//     setFavourites((prev) => prev.filter((fav) => fav.itemId !== itemId));
//   };

//   if (status !== "authenticated") {
//     return <p style={{ color: "white", textAlign: "center" }}>Zaloguj się, aby zobaczyć ulubione</p>;
//   }

//   return (
//     <Wrapper>
//       <List>
//         <Heading>Twoje ulubione</Heading>
//         {favourites.length === 0 ? (
//           <p style={{ color: "gray", gridColumn: "1 / -1", textAlign: "center" }}>
//             Brak ulubionych pozycji
//           </p>
//         ) : (
//           favourites.map((item) => (
//             <MovieItem key={item.itemId}>
//               <Tooltip title="Usuń">
//                 <RemoveButton onClick={() => handleRemove(item.itemId)}>
//                   <CloseIcon fontSize="small" />
//                 </RemoveButton>
//               </Tooltip>
//               <Poster
//                 src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
//                 alt={item.title}
//                 width={100}
//                 height={150}
//               />
//               <p>{item.title}</p>
//             </MovieItem>
//           ))
//         )}
//       </List>
//     </Wrapper>
//   );
// };