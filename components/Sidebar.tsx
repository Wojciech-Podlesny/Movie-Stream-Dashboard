'use client';

import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesSection } from "./CategoriesSection";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CircularProgress } from "@mui/material";
import { fetchCategories } from "@/app/store/Media/categoriesSlice";
import { styled } from "styled-components";
import { MdChevronRight } from "react-icons/md";
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';


const CategoriesContainer = styled.div`
  background-color: #121212;
  padding: 30px 20px;
  max-width: 280px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    top: 60px;
  }
`;

const SidebarContainer = styled.div<{ open: boolean }>`
  max-width: 250px;
  min-height: 100vh;
  background: rgba(13, 13, 29, 0.8);
  color: white;
  width: 200px;
  left: 0;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  z-index: 999;

  @media (max-width: 768px) {
    width: 100%;
    top: 30px;
    height: 100vh;
    padding: 80px 20px 20px;
    background: rgba(13, 13, 29, 0.95);
  }
`;

const SidebarOpenTrigger = styled.button`
 
  top: 60px;
  left: 0;
  background: rgba(13, 13, 29, 0.9);
  border: none;
  color: white;
  padding: 8px;
  cursor: pointer;
  border-bottom-right-radius: 25px;
  z-index: 1100; 
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    top: 60px;
  }
`;


const ToggleButton = styled.button`
  position: fixed;
  top: 10px;
  right: 7px;
  background: transparent;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  
  @media (max-width: 768px) {
    top: 80px;
    right: 20px;
    border-radius: 50%;
    width: 45px;
    height: 45px;

  }
`;


// const ClearButton = styled.button`
//   background-color: rgba(255, 255, 255, 0.1);
//   color: white;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   border-radius: 8px;
//   padding: 10px 16px;
//   font-size: 0.95rem;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   align-self: center;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.2);
//     border-color: rgba(255, 255, 255, 0.4);
//     font-weight: bold;
//   }

//   @media (max-width: 768px) {
//     padding: 8px 12px;
//     font-size: 0.9rem;
//   }
// `;


export const Sidebar = () => {
  const [openFilms, setOpenFilms] = useState<boolean>(true);
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [openSeries, setOpenSeries] = useState<boolean>(false);
  const { seriesCategories, moviesCategories, error, loading } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading)
    return (
      <CategoriesContainer>
        Loading categories <CircularProgress />
      </CategoriesContainer>
    );

  if (error) return <CategoriesContainer>{error}</CategoriesContainer>;


  return (
    <>
      {!openSidebar && (
        <SidebarOpenTrigger onClick={() => setOpenSidebar(true)}>
          <MdChevronRight size={45} />
        </SidebarOpenTrigger>
      )}

      <SidebarContainer open={openSidebar}>
        <ToggleButton onClick={() => setOpenSidebar(false)}>
          <ArrowBackIosNewIcon fontSize="medium" />
        </ToggleButton>

        <CategoriesSection
          title="Movies"
          icon={MovieIcon}
          categories={moviesCategories}
          isOpen={openFilms}
          setIsOpen={setOpenFilms} type="movie"
        />

        <CategoriesSection
          title="Series"
          icon={TvIcon}
          categories={seriesCategories}
          isOpen={openSeries}
          setIsOpen={setOpenSeries} type="series"
        />

        {/* <ClearButton onClick={ handleClickCategories}>Clear Selected</ClearButton> */}
      </SidebarContainer>
    </>
  );
};

















// 'use client'

// import { AppDispatch, RootState } from "@/app/store/store";
// import { useEffect, useState } from "react";
// import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
// import { useDispatch, useSelector } from "react-redux";
// import { CategoriesSection } from "./CategoriesSection";
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { CircularProgress } from "@mui/material";
// import { fetchCategories } from "@/app/store/Media/categoriesSlice";

// import Link from "next/link";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import { styled } from "styled-components";

// export const CategoriesContainer = styled.div`
//   background-color: #121212;
//   padding: 20px;
//   max-width: 250px;
//   color: #fff;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;

//    @media (max-width:768px) {
//    flex-direction: row;
//     width: 100%;
//     position: fixed;
//     top: 60px;
//   }
// `;


// export const CategoryList = styled.ul<{ isVisible: boolean }>`
//   list-style: none;
//   padding: 10px;
//   margin: 0;
//   display: ${({ isVisible }) => (isVisible ? "block" : "none")};

//   @media (max-width: 768px) {
//     display: ${({ isVisible }) => (isVisible ? "grid" : "none")};
//     grid-template-columns: repeat(2, minmax(100px, 1fr));
//     gap: 10px;
//     padding: 10px 0;
//   }
// `;


// export const CategoryItem = styled.li`
//   font-size: 1rem;
//   font-weight: 400;
//   color: white;
//   cursor: pointer;
//   white-space: nowrap;
//   transition: color 0.2s;

//   &:hover {
//     color: #00ffd0;
//     font-weight: bold;
//   }

//   @media (max-width: 768px) {
//     font-size: 0.95rem;
//   }
// `;

// export const SectionHeader = styled.div`
//   display: flex;
//   justify-content: start;
//   gap: 5px;
//   align-items: center;
//   font-size: 1.2rem;
//   font-weight: bold;
//   cursor: pointer;
//   color: white;
// `;

// export const SectionTitle = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// export const DropdownIcon = styled(MdOutlineArrowDropDown)<{ isOpen: boolean }>`
//   transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
//   transition: transform 0.3s ease;

// `
//  const NavMenu = styled.nav`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
//   gap: 10px;

//   @media (max-width: 768px) {
//     flex-direction: row;
//     margin: 0 auto;
//     justify-content: center;
//     align-items: center;
//   }

  
// `;

// const NavItem = styled(Link)<{ open: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   color: white;
//   text-decoration: none;
//   font-size: ${({ open }) => (open ? "1rem" : "0")};
//   white-space: nowrap;
//   overflow: hidden;
//   transition: font-size 0.3s ease, opacity 0.3s ease;

//   &:hover {
//     color: white;
//     font-weight: bold;
//   }

// `;

//  const SidebarContainer = styled.div<{ open: boolean }>`
//   width: 250px;
//   height: 100vh; /* Dodane, by sidebar miał pełną wysokość */
//   background: rgba(13, 13, 29, 0.8);
//   color: white;
//   left: 0;
//   top: 60px;
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   padding: 20px;
//   transition: transform 0.3s ease-in-out;
//   transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
//   position: fixed; /* To sprawia, że sidebar jest przyklejony do widoku */
//   z-index: 999; /* Aby sidebar był nad innymi elementami */

//   @media (max-width: 768px) {
//     flex-direction: row;
//     width: 100%;
//     height: auto;
//     top: 53px;
//   }
// `;


//  const CategoriesContainerStyled = styled.div<{ open: boolean }>`
//   width: 250px;
//   height: 100vh; 
//   background: rgba(13, 13, 29, 0.8);
//   left: 0;
//   top: 0;
//   padding: 20px;
//   transition: transform 0.3s ease-in-out;
//   transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

//   @media (max-width: 768px) {
//     flex-direction: row;
//     width: 100%;
//     height: auto;
//     position: fixed;
//     top: 53px;
//     padding: 10px;
//   }
// `;

// export const ToggleButton = styled.button`
//   position: absolute;
//   right: 5px;
//   top: 5px;
//   border: none;
//   background: none;
//   color: white;
//   cursor: pointer;
//   padding: 10px;
//   border-radius: 5px;
// `;


// export const Sidebar = () => {
//   const [openFilms, setOpenFilms] = useState<boolean>(true);
//   const [openSidebar, setOpenSIdebar] = useState<boolean>(true);
//   const [openSeries, setOpenSeries] = useState<boolean>(false);
//   const { seriesCategories,moviesCategories,error,loading } = useSelector((state: RootState) => state.categories);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   if (loading)
//     return (
//       <CategoriesContainer>
//         {" "}
//         Loading categories <CircularProgress />{" "}
//       </CategoriesContainer>
//     );
//   if (error) return <CategoriesContainer>{error}</CategoriesContainer>; 
//   return (
//     <>
//       {openSidebar ? (
//         <SidebarContainer open={openSidebar}>
//           <ToggleButton onClick={() => setOpenSIdebar(prev => !prev)}>
//           <ArrowBackIosNewIcon fontSize="medium" />
//           </ToggleButton>
//           <NavMenu>
//             <NavItem href="/movies" open={openSidebar}>
//               <VideocamOutlinedIcon fontSize="large" /> {openSidebar && "Movies"}
//             </NavItem>
//             <NavItem href="/series" open={openSidebar}>
//               <VideocamOutlinedIcon fontSize="large" /> {openSidebar && "Series"}
//             </NavItem>
//           </NavMenu>
//         </SidebarContainer>
//       ) : (
//         <CategoriesContainerStyled open={!openSidebar}>
//           <ToggleButton onClick={() => setOpenSIdebar(!openSidebar)}>
//           <ArrowBackIosNewIcon fontSize="medium" />
//           </ToggleButton>
//           <CategoriesSection
//             title="Movies"
//             icon={VideocamOutlinedIcon}
//             categories={moviesCategories}
//             isOpen={openFilms}
//             setIsOpen={setOpenFilms}
//           ></CategoriesSection>

//           <CategoriesSection
//             title="Series"
//             icon={VideocamOutlinedIcon}
//             categories={seriesCategories}
//             isOpen={openSeries}
//             setIsOpen={setOpenSeries}
//           ></CategoriesSection>
//         </CategoriesContainerStyled>
//       )}
//     </>
//   );
// }