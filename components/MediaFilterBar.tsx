import { useState } from "react";
import styled from "styled-components";
import { MediaFilterTitle } from "./MoviesFilterTittle";
import { MediaFilterButtons } from "./MediaFilterButtons";
import { MediaSortSelect } from "./MediaSortSelect";
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import ClearIcon from '@mui/icons-material/Clear';

const Wrapper = styled.div`
  width: 100%;
  background-color: #0e0e2b;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 200px;
  padding: 16px;

  @media (min-width: 769px) {
    padding-bottom: 0;
  }
`;

const MobileToggleButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DrawerOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Drawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 50vh;
  width: 100%;
  background-color: #0e0e2b;
  z-index: 1000;
  padding: 16px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(100%)"};

  @media (min-width: 769px) {
    display: none;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 48px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
`;

const SectionMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 16px;
  margin-top: 24px;
`;

const DesktopSectionMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 10px;
    background-color: #0e0e2b;
  }
`;

type MediaFilterProps = {    //to other files
  filter: string;
  sortDirection: "asc" | "desc";
  setFilter: (val: string) => void;
  setSortDirection: (val: "asc" | "desc") => void;
  showAll: boolean;
  toggleShowAll: () => void;
};

export const MediaFilterBar = ({sortDirection,setFilter,setSortDirection}: MediaFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <TopBar>
        <MediaFilterTitle />
        <MobileToggleButton onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <ClearIcon fontSize="medium" />
          ) : (
            <FilterListAltIcon fontSize="medium" />
          )}
        </MobileToggleButton>
      </TopBar>

      <DesktopSectionMenu>
        <MediaFilterButtons
          sortDirection={sortDirection}
          setFilter={setFilter}
          setSortDirection={setSortDirection}
        />
        <MediaSortSelect
          sortDirection={sortDirection}
          setFilter={setFilter}
          setSortDirection={setSortDirection}
        />
      </DesktopSectionMenu>

      <DrawerOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <Drawer isOpen={isOpen}>
        <DrawerHeader>
          <CloseButton onClick={() => setIsOpen(false)}>
            <ClearIcon fontSize="medium" />
          </CloseButton>
        </DrawerHeader>
        <SectionMenu>
          <MediaFilterButtons
            sortDirection={sortDirection}
            setFilter={setFilter}
            setSortDirection={setSortDirection}
          />
          <MediaSortSelect
            sortDirection={sortDirection}
            setFilter={setFilter}
            setSortDirection={setSortDirection}
          />
        </SectionMenu>
      </Drawer>
    </Wrapper>
  );
};
