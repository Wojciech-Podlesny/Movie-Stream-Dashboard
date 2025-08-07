'use client';

import { useState } from "react";
import { MediaFilterButtons } from "./MediaFilterButtons";
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import ClearIcon from '@mui/icons-material/Clear';
import {
  MediaFilterBarWrapper,
  MediaFilterTopBar,
  MediaFilterMobileToggle,
  MediaFilterDrawer,
  MediaFilterDrawerHeader,
  MediaFilterDrawerOverlay,
  MediaFilterCloseButton,
  MediaFilterDesktopMenu,
  MediaFilterMobileMenu,
} from "@/styles/MediaFilterBar.styled";


type MediaFilterProps = {   
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
    <MediaFilterBarWrapper>
      <MediaFilterTopBar>
        <MediaFilterMobileToggle onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <ClearIcon fontSize="medium" />
          ) : (
            <FilterListAltIcon fontSize="medium" />
          )}
        </MediaFilterMobileToggle>
      </MediaFilterTopBar>

      <MediaFilterDesktopMenu>
        <MediaFilterButtons
          sortDirection={sortDirection}
          setFilter={setFilter}
          setSortDirection={setSortDirection}
        />
      </MediaFilterDesktopMenu>

      <MediaFilterDrawerOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <MediaFilterDrawer isOpen={isOpen}>
        <MediaFilterDrawerHeader>
          <MediaFilterCloseButton onClick={() => setIsOpen(false)}>
            <ClearIcon fontSize="medium" />
          </MediaFilterCloseButton>
        </MediaFilterDrawerHeader>
        <MediaFilterMobileMenu>
          <MediaFilterButtons
            sortDirection={sortDirection}
            setFilter={setFilter}
            setSortDirection={setSortDirection}
          />
        </MediaFilterMobileMenu>
      </MediaFilterDrawer>
    </MediaFilterBarWrapper>
  );
};
