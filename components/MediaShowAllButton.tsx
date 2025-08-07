import { ToggleShowAllButton } from "@/styles/MediaShowAllButtons.styled";

type MediaShowButtonProps = { 
  showAll: boolean;
  toggleShowAll: () => void;
};

export const MediaShowAllButton = ({ showAll, toggleShowAll }: MediaShowButtonProps) => (
  <ToggleShowAllButton  onClick={toggleShowAll}>
    {showAll ? "Show Less" : "Show More"}
  </ToggleShowAllButton >
);
