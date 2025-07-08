import { Category } from "./models";

export type PropsCategory = {
  title: string;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  categories: Category[];
  icon: React.ElementType;
};
