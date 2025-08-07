import { setSelectedSeriesCateogory, setSelectedMovieCategory } from "@/app/store/Media/categoriesSlice";
import { CategorySectionHeader,CategorySectionTitle,CategoryDropdownIcon,CategoryListWrapper,CategoryListItem } from "@/styles/CategoriesSection.styled";
import { Genre, PropsCategory } from "@/types";
import { useDispatch } from "react-redux";

interface CategoriesSectionProps extends PropsCategory {
  type: "movie" | "series";
}

export const CategoriesSection = ({title,icon: Icon,categories,isOpen,setIsOpen,type}: CategoriesSectionProps) => {
  const dispatch = useDispatch();

   const handleClickCategories = (genre: Genre) => {
    if(type === "movie") {
      dispatch(setSelectedMovieCategory(genre))
    } else {
      dispatch(setSelectedSeriesCateogory(genre))
    }
   }
   
  return (
    <>
      <CategorySectionHeader
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <CategorySectionTitle>
          <Icon size={40} />
          <p>{title}</p>
        </CategorySectionTitle>
        <CategoryDropdownIcon isOpen={isOpen} />
      </CategorySectionHeader>
      <CategoryListWrapper isVisible={isOpen}>
        {categories.map((genre) => (
          <CategoryListItem
            key={genre.id}
            onClick={() => handleClickCategories(genre)}
          >
            {genre.name}
          </CategoryListItem>
        ))}
      </CategoryListWrapper>
    </>
  );
};
