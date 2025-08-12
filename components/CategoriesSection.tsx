import {
  setSelectedSeriesCategory,
  setSelectedMovieCategory,
  clearSelectedMovieCategory,
  clearSelectedSeriesCategory,
} from "@/app/store/Media/categoriesSlice";
import {
  CategorySectionHeader,
  CategorySectionTitle,
  CategoryDropdownIcon,
  CategoryListWrapper,
  CategoryListItem,
} from "@/styles/CategoriesSection.styled";
import { Genre, PropsCategory } from "@/types";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useCallback } from "react";

interface CategoriesSectionProps extends PropsCategory {
  type: "movie" | "series";
}

export const CategoriesSection = ({
  title,
  icon: Icon,
  categories,
  isOpen,
  setIsOpen,
  type,
}: CategoriesSectionProps) => {
  const dispatch = useDispatch();

  const selected = useSelector((s: RootState) =>
    type === "movie"
      ? s.categories.selectedMovieCategory
      : s.categories.selectedSeriesCategory
  );

  const handleClickCategories = useCallback(
    (genre: Genre | null) => {
      if (type === "movie") {
        if (genre) {
          dispatch(setSelectedMovieCategory(genre));
        } else {
          dispatch(clearSelectedMovieCategory());
        }
      } else {
        if (genre) {
          dispatch(setSelectedSeriesCategory(genre));
        } else {
          dispatch(clearSelectedSeriesCategory());
        }
      }
    },
    [dispatch, type]
  );

  const handleClearCategories = useCallback(() => handleClickCategories(null), [handleClickCategories]);

  return (
    <>
      <CategorySectionHeader onClick={() => setIsOpen(!isOpen)}>
        <CategorySectionTitle>
          <Icon size={40} />
          <p>
            {title}
            {selected ? (
              <span style={{ marginLeft: 8, opacity: 0.8 }}>· {selected.name}</span>
            ) : null}
          </p>
        </CategorySectionTitle>
        <CategoryDropdownIcon isOpen={isOpen} />
      </CategorySectionHeader>

      <CategoryListWrapper isVisible={isOpen} role="listbox">
        <CategoryListItem
          role="option"
          aria-selected={!selected}
          onClick={() => handleClickCategories(null)}
          style={{
            fontWeight: !selected ? 700 : 500,
            background: !selected ? "rgba(255,255,255,0.08)" : "transparent",
            borderRadius: 8,
          }}
        >
          All
        </CategoryListItem>

        {categories.map((genre) => {
          const isActive = selected?.id === genre.id;
          return (
            <CategoryListItem
              key={genre.id}
              role="option"
              aria-selected={isActive}
              onClick={() => handleClickCategories(genre)}
              style={{
                fontWeight: isActive ? 700 : 500,
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                borderRadius: 8,
              }}
            >
              {genre.name}
            </CategoryListItem>
          );
        })}

        <Button
          variant="outlined"
          onClick={handleClearCategories}
          color="inherit"
          disabled={!selected}
          sx={{
            mt: 1.5,
            borderColor: "#fff",
            color: "#fff",
            fontWeight: 500,
            alignSelf: "flex-start",
            opacity: selected ? 1 : 0.5,
            "&:hover": {
              borderColor: selected ? "#aaa" : "#fff",
              backgroundColor: selected
                ? "rgba(255,255,255,0.08)"
                : "transparent",
            },
          }}
        >
          Clear selected
        </Button>
      </CategoryListWrapper>
    </>
  );
};
