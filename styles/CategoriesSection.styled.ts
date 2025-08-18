import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { styled } from "styled-components";

export const CategorySectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 0 4px;
    gap: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export const CategorySectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;

  p {
    margin: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 6px;
  }
`;

export const CategoryDropdownIcon = styled(
  ArrowDropDownOutlinedIcon
)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  font-size: 24px;
  color: white;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const CategoryListWrapper = styled.ul<{ isVisible: boolean }>`
  list-style: none;
  margin: 8px 0 16px;
  padding-left: 10px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};

  @media (max-width: 768px) {
    /* POD nagłówkiem: siatka 2 kolumny */
    display: ${({ isVisible }) => (isVisible ? "grid" : "none")};
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 10px;
    padding: 6px 0 0;
    margin: 6px 0 12px;
  }
`;

export const CategoryListItem = styled.li<{ active?: boolean }>`
  font-size: 0.95rem;
  color: ${({ active }) => (active ? "#00ffd0" : "white")};
  font-weight: ${({ active }) => (active ? "bold" : 400)};
  background: ${({ active }) =>
    active ? "rgba(255,255,255,0.1)" : "transparent"};
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    color: #00ffd0;
  }

  @media (max-width: 768px) {
    width: 100%;
    white-space: nowrap;
    font-size: 0.9rem;
    padding: 6px 10px;
  }
`;
