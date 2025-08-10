'use client';

import { MediaFilterButtons } from "./MediaFilterButtons";
import {
  MediaFilterBarWrapper,
  MediaFilterDesktopMenu,
} from "@/styles/MediaFilterBar.styled";
import { MediaFilterProps } from "@/types/mediaFilter";

export const MediaFilterBar = ({ sortDirection, setFilter, setSortDirection }: MediaFilterProps) => {
  return (
    <MediaFilterBarWrapper>
      <MediaFilterDesktopMenu>
        <MediaFilterButtons
          sortDirection={sortDirection}
          setFilter={setFilter}
          setSortDirection={setSortDirection}
        />
      </MediaFilterDesktopMenu>
    </MediaFilterBarWrapper>
  );
};
