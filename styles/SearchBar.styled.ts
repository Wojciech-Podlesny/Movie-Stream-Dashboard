import { styled } from "styled-components";

export const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1.5px solid #ccc;
  border-radius: 20px;
  font-size: 15px;
  outline: none;
  background-color: #fff;

  &:focus {
    border-color: #007aff;
    box-shadow: 0 0 5px rgba(0, 122, 255, 0.3);
  }

  &::placeholder {
    color: #999;
  }
`;

export const SearchIconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
`;

export const SearchDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0 0 12px 12px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
`;

export const SearchDropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  font-size: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background-color: #f0f8ff;
  }

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 40px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 12px;
  }

  span {
    font-weight: 500;
    color: #333;
  }
`;

export const SearchStatusMessage = styled.div`
  padding: 10px;
  color: #666;
  font-size: 14px;
`;
