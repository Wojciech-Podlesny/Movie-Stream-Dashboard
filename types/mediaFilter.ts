export type MediaFilterProps = {
  setFilter: (v: string) => void;
  setSortDirection: (dir: "asc" | "desc") => void;
  sortDirection: "asc" | "desc";
};

export type MediaFilterButtonsProps = {
  sortDirection: "asc" | "desc";
  setFilter: (value: string) => void;
  setSortDirection: (value: "asc" | "desc") => void;
};

export type MenuFilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (d: "asc" | "desc") => void;
  setFilter: (v: string) => void;
};