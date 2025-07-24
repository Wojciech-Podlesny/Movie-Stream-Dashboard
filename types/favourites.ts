export interface FavoriteButtonProps {  //to other files   //do favourites.ts
  itemId: string;
  type: "movie" | "series";
  data: Record<string, unknown>;
}
 export type FavouriteItem = {   
    poster_path: string;
    title: string;
    itemId: string;
  };

  export type favouritesDrawerProps = {  
  open: boolean,
  onClose: () => void 
}