import {
  CategoryItem,
  CategoryList,
  DropdownIcon,
  SectionHeader,
  SectionTitle,
} from "@/styles/Sidebar.styled";



type Category = {
    id:number,
    name: string,
}

type Props = {
  title: string;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  categories: Category[];
  icon: React.ElementType;
};

export const CategoriesSection = ({
  title,
  icon: Icon,
  categories,
  isOpen,
  setIsOpen,
}: Props) => {
  return (
    <>
      <SectionHeader
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <SectionTitle>
          <Icon size={20} />
          <p>{title}</p>
        </SectionTitle>
        <DropdownIcon isOpen={isOpen} />
      </SectionHeader>
      <CategoryList isVisible={isOpen}>
        {categories.map((genre) => (
          <CategoryItem key={genre.id}>{genre.name}</CategoryItem>
        ))}
      </CategoryList>
    </>
  );
};
