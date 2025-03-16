import Link from "next/link";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { styled } from "styled-components";

export const CategoriesContainer = styled.div`
  background-color: #1a1a2e;
  padding: 20px;
  max-width: 250px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


export const CategoryList = styled.ul<{ isVisible: boolean }>`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

export const CategoryItem = styled.li`
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 400;
  color:rgb(255, 255, 255);
  cursor: pointer;

  &:hover {
    color: #fff;
    font-weight: bold;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: start;
  gap: 5px;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DropdownIcon = styled(MdOutlineArrowDropDown)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;

`
export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

export const NavItem = styled(Link)<{ open: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  font-size: ${({ open }) => (open ? "1rem" : "0")};
  white-space: nowrap;
  overflow: hidden;
  transition: font-size 0.3s ease, opacity 0.3s ease;

  &:hover {
    color: white;
    font-weight: bold;
  }
`;

export const SidebarContainer = styled.div<{ open: boolean }>`
  width: 250px;
  background: #282828;
  color: white;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width:768px) {
   display: none;
  }
`;

export const CategoriesContainerStyled = styled.div<{ open: boolean }>`
  width: 250px;
  height: 100vh;
  background: #282828;
  left: 0;
  top: 0;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
`;
