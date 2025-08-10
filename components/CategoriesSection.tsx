import { setSelectedSeriesCateogory, setSelectedMovieCategory, clearSelectedMovieCategory, clearSelectedSeriesCategory, clearSelectedCategories } from "@/app/store/Media/categoriesSlice";
import { CategorySectionHeader, CategorySectionTitle, CategoryDropdownIcon, CategoryListWrapper, CategoryListItem } from "@/styles/CategoriesSection.styled";
import { Genre, PropsCategory } from "@/types";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

interface CategoriesSectionProps extends PropsCategory {
  type: "movie" | "series";
}

export const CategoriesSection = ({ title, icon: Icon, categories, isOpen, setIsOpen, type }: CategoriesSectionProps) => {
  const dispatch = useDispatch();

  const handleClickCategories = (genre: Genre) => {
    if (type === "movie") {
      dispatch(setSelectedMovieCategory(genre))
    } else {
      dispatch(setSelectedSeriesCateogory(genre))
    }
  }

  const handleClickClearCategories = () => {
    dispatch(clearSelectedCategories());
    if (type === "movie") {
      dispatch(clearSelectedMovieCategory());
    } else {
      dispatch(clearSelectedSeriesCategory());
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
        <Button
          variant="outlined"
          onClick={handleClickClearCategories}
          color="inherit"
          sx={{
            mt: 1.5,
            borderColor: "#fff",
            color: "#fff",
            fontWeight: 500,
            alignSelf: "flex-start",
            "&:hover": {
              borderColor: "#aaa",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          Clear selected
        </Button>
      </CategoryListWrapper>
    </>
  );
};
