import { styled } from "styled-components";

export const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;


export const InputWrapper = styled.div`
  position: relative;
  height: 44px; 
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  padding: 10px 44px 10px 15px;
  border: 1.5px solid #ccc;
  border-radius: 20px;
  font-size: 15px;
  line-height: normal; 
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
  color: #000;
  display: flex;
  align-items: center;
`;

export const SearchDropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px); 
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  max-height: 320px;
  overflow-y: auto;
  z-index: 20;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SearchDropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  font-size: 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background-color: #f7fbff;
    transform: translateX(2px);
  }

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 40px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  span {
    font-weight: 500;
    color: #2d2d2d;
    line-height: 1.4;
  }
`;

export const SearchStatusMessage = styled.div`
  padding: 10px;
  color: #666;
  font-size: 14px;
`;
