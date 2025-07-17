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

   @media (max-width:768px) {
   flex-direction: row;
    width: 100%;
    position: fixed;
    top: 60px;
  }
`;


export const CategoryList = styled.ul<{ isVisible: boolean }>`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};

  @media (max-width: 768px) {
    display: ${({ isVisible }) => (isVisible ? "grid" : "none")};
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    gap: 10px;
    padding: 10px 0;
  }
`;


export const CategoryItem = styled.li`
  font-size: 1rem;
  font-weight: 400;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s;

  &:hover {
    color: #00ffd0;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
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

  @media (max-width: 768px) {
    flex-direction: row;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }

  
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
  height: 100vh; 
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
  position: fixed; 
  z-index: 999; 

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    height: auto;
    top: 53px;
  }
`;


export const CategoriesContainerStyled = styled.div<{ open: boolean }>`
  width: 250px;
  height: 100vh; 
  background:rgba(13, 13, 29, 0.8);
  left: 0;
  top: 0;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    height: auto;
    position: fixed;
    top: 53px;
    padding: 10px;
  }
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
