'use client';

import ClearIcon from '@mui/icons-material/Clear';
import {
  MediaFilterDrawer,
  MediaFilterDrawerHeader,
  MediaFilterDrawerOverlay,
  MediaFilterCloseButton,
  MediaFilterMobileMenu,
} from "@/styles/MediaFilterBar.styled";
import { useEffect, useCallback } from "react";
import { MediaFilterButtons } from "./MediaFilterButtons";
import { MenuFilterDrawerProps } from '@/types/mediaFilter';

export default function FiltersDrawer({isOpen,onClose,
  sortDirection,
  setSortDirection,
  setFilter,
}: MenuFilterDrawerProps) {

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <>
      <MediaFilterDrawerOverlay
        isOpen={isOpen}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <MediaFilterDrawer
        isOpen={isOpen}
      >
        <MediaFilterDrawerHeader>
          <MediaFilterCloseButton onClick={onClose} aria-label="Zamknij filtry">
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
    </>
  );
}
