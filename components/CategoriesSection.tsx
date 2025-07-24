import { setSelectedSeriesCateogory, setSelectedMovieCategory } from "@/app/store/Media/categoriesSlice";
import { Genre, PropsCategory } from "@/types";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { MdOutlineArrowDropDown } from "react-icons/md";

const SectionHeader = styled.div`           
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;

  p {
    margin: 0;
  }
`;

const DropdownIcon = styled(MdOutlineArrowDropDown)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  font-size: 24px;
  color: white;
`;

const CategoryList = styled.ul<{ isVisible: boolean }>`
  list-style: none;
  margin: 8px 0 16px;
  padding-left: 10px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};

  @media (max-width: 768px) {
    display: ${({ isVisible }) => (isVisible ? "grid" : "none")};
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
`;

const CategoryItem = styled.li<{ active?: boolean }>`
  font-size: 0.95rem;
  color: ${({ active }) => (active ? "#00ffd0" : "white")};
  font-weight: ${({ active }) => (active ? "bold" : 400)};
  background: ${({ active }) =>
    active ? "rgba(255,255,255,0.1)" : "transparent"};
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    color: #00ffd0;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 5px 8px;
  }
`;

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
      <SectionHeader
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <SectionTitle>
          <Icon size={40} />
          <p>{title}</p>
        </SectionTitle>
        <DropdownIcon isOpen={isOpen} />
      </SectionHeader>
      <CategoryList isVisible={isOpen}>
        {categories.map((genre) => (
          <CategoryItem
            key={genre.id}
            onClick={() => handleClickCategories(genre)}
          >
            {genre.name}
          </CategoryItem>
        ))}
      </CategoryList>
    </>
  );
};
