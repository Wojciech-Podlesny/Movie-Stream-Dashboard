import { useState } from "react";
import styled from "styled-components";

const SectionTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 16px 0;

`;

const FilterButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#0099ff" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#0099ff")};
  border: 2px solid #0099ff;
  padding: 10px 18px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.25s ease-in-out;

  &:hover {
    background: #00bfff;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
  }

  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
`;

type MediaFilterMenuProps = {    
  setFilter: (value: string) => void;
  setSortDirection: (dir: "asc" | "desc") => void;
};

export const MoviesFilterMenu = ({ setFilter, setSortDirection }: MediaFilterMenuProps) => {
  const [sortDirectionLocal, setSortDirectionLocal] = useState<"asc" | "desc">("asc");
  const [activeFilter, setActiveFilter] = useState<string>("");

  const toggleSortDirection = () => {
    const newDirection = sortDirectionLocal === "asc" ? "desc" : "asc";
    setSortDirectionLocal(newDirection);
    setSortDirection(newDirection);
  };

  const handleFilterClick = (filterType: string, toggleSort = false) => {
    setActiveFilter(filterType);
    setFilter(filterType);
    if (toggleSort) toggleSortDirection();
  };


  return (
    <SectionTitle>
      <FilterButton active={activeFilter === "latest"} onClick={() => handleFilterClick("latest")}>
        Latest
      </FilterButton>
      <FilterButton
        active={activeFilter === "best_advised"}
        onClick={() => handleFilterClick("best_advised")}
      >
        Best advised
      </FilterButton>
      <FilterButton active={activeFilter === "rating"} onClick={() => handleFilterClick("rating")}>
        Rating
      </FilterButton>
      <FilterButton
        active={activeFilter === "year"}
        onClick={() => handleFilterClick("year", true)}
      >
        Year {activeFilter === "year"}
      </FilterButton>
      <FilterButton
        active={activeFilter === "a-z"}
        onClick={() => handleFilterClick("a-z", true)}
      >
        A-Z {activeFilter === "a-z"} 
      </FilterButton>
    </SectionTitle>
  );
};

// do usunięcia