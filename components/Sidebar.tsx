import { useMovies } from "@/hooks/useContext";
import { ImVideoCamera } from "react-icons/im";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import styled from "styled-components";

const CategoriesContainer = styled.div`
  background-color: #1a1a2e;
  padding: 20px;
  max-width: 250px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
`;

// const CategoryList = styled.ul<{ isVisible: boolean }>`
//   list-style: none;
//   padding: 10px;
//   margin: 0;
//   display: ${({ isVisible }) => (isVisible ? "block" : "none")};
// `;

const CategoryItem = styled.li`
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 400;
  color: #d3c3c3;
  cursor: pointer;

  &:hover {
    color: #fff;
    font-weight: bold;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;


// const navMenu = [
//   {
//     title: 'Films',
//     href: '/films',
//     icon: <ImVideoCamera size={20} />
//   },

//   {
//     title: 'Series',
//     href: '/series',
//     icon: <RiMovie2Line size={20} />
//   },
// ]


export const Sidebar: React.FC = () => {
  const { genres, loading, error, tvGenres } = useMovies();

  if (loading) 
    return <CategoriesContainer>Ładowanie...</CategoriesContainer>;

  if (error) 
    return <CategoriesContainer>{error}</CategoriesContainer>;

  return (
    <CategoriesContainer>
      <SectionHeader>
        <SectionTitle>
          <ImVideoCamera size={20} />
          <p>Films</p>
        </SectionTitle>
        <MdOutlineArrowDropDown />
      </SectionHeader>
      <CategoryList>
        {genres.map((genre) => (
          <CategoryItem key={genre.id}>{genre.name}</CategoryItem>
        ))}
      </CategoryList>
      <SectionHeader>
        <SectionTitle>
          <RiMovie2Line size={20} />
          <p>Series</p>
        </SectionTitle>
        <MdOutlineArrowDropDown />
      </SectionHeader>
      <CategoryList>
        {tvGenres.map((genre) => (
          <CategoryItem key={genre.id}>{genre.name}</CategoryItem>
        ))}
      </CategoryList>
    </CategoriesContainer>
  );
};


// "use client";
// import { useMovies } from "@/hooks/useContext";
// import Link from "next/link";
// import { useState } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { ImVideoCamera } from "react-icons/im";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import { RiMovie2Line } from "react-icons/ri";
// import styled from "styled-components";


// const CategoriesContainer = styled.div`
//   background-color: #1a1a2e;
//   padding: 20px;
//   max-width: 250px;
//   color: #fff;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const CategoryList = styled.ul`
//   list-style: none;
//   padding: 10px;
//   margin: 0;
// `;

// const CategoryItem = styled.li`
//   font-size: 1rem;
//   margin-bottom: 8px;
//   font-weight: 400;
//   color: #d3c3c3;
//   cursor: pointer;

//   &:hover {
//     color: #fff;
//     font-weight: bold;
//   }
// `;

// const SectionHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 1.2rem;
//   font-weight: bold;
// `;

// const SectionTitle = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const SidebarContainer = styled.div<{ open: boolean }>`
//   background-color: #1a1a2e;
//   padding: 20px;
//   width: ${({ open }) => (open ? "250px" : "60px")}; /* Zwija i rozwija sidebar */
//   color: #fff;
//   display: flex;
//   flex-direction: column;
//   transition: width 0.3s ease;
//   position: fixed;
//   height: 100vh;
//   left: 0;
//   top: 50px;
// `;

// const ToggleButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   font-size: 24px;
//   cursor: pointer;
//   align-self: flex-end;
// `;

// const NavMenu = styled.nav`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
//   gap: 10px;
// `;

// const NavItem = styled(Link)<{ open: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   color: #d3c3c3;
//   text-decoration: none;
//   font-size: ${({ open }) => (open ? "1rem" : "0")};
//   white-space: nowrap;
//   overflow: hidden;
//   transition: font-size 0.3s ease, opacity 0.3s ease;
  
//   &:hover {
//     color: #fff;
//     font-weight: bold;
//   }
// `;


// const navMenu = [
//   {
//     title: "Films",
//     href: "/films",
//     icon: <ImVideoCamera size={20} />,
//   },

//   {
//     title: "Series",
//     href: "/series",
//     icon: <RiMovie2Line size={20} />,
//   },
// ];

// export const Sidebar = () => {
//   const { genres, loading, error, tvGenres } = useMovies();
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const handleClick = () => {
//     setIsOpen(!isOpen)
//   }

//   if (loading) return <CategoriesContainer>Ładowanie...</CategoriesContainer>;

//   if (error) return <CategoriesContainer>{error}</CategoriesContainer>;


//   return (
//     <SidebarContainer open={isOpen}>
//       <ToggleButton onClick={handleClick}>
//           {isOpen ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={24} />}
//       </ToggleButton>

//       <NavMenu>
//         {navMenu.map((element) => (
//           <Link href={element.href} key={element.title}>
//             {element.icon}
//           </Link>
//         ))}
//       </NavMenu>
//     </SidebarContainer>
//   );
// };

// "use client";
// import { useMovies } from "@/hooks/useContext";
// import Link from "next/link";
// import { useState } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { ImVideoCamera } from "react-icons/im";
// import { RiMovie2Line } from "react-icons/ri";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import styled from "styled-components";

// const SidebarContainer = styled.div<{ open: boolean }>`
//   background-color: #1a1a2e;
//   padding: 20px;
//   width: ${({ open }) => (open ? "250px" : "60px")}; /* Zwijanie sidebaru */
//   color: #fff;
//   display: flex;
//   flex-direction: column;
//   transition: width 0.3s ease;
//   position: fixed;
//   height: 100vh;
//   left: 0;
//   top: 0;
// `;

// const ToggleButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   font-size: 24px;
//   cursor: pointer;
//   align-self: flex-end;
// `;

// const NavMenu = styled.nav`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
//   gap: 10px;
// `;

// const NavItem = styled(Link)<{ open: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   color: #d3c3c3;
//   text-decoration: none;
//   font-size: ${({ open }) => (open ? "1rem" : "0")};
//   white-space: nowrap;
//   overflow: hidden;
//   transition: font-size 0.3s ease, opacity 0.3s ease;
  
//   &:hover {
//     color: #fff;
//     font-weight: bold;
//   }
// `;

// const CategoryContainer = styled.div`
//   background-color: #1a1a2e;
//   padding: 20px;
//   max-width: 250px;
//   color: #fff;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const CategoryList = styled.ul`
//   list-style: none;
//   padding: 10px;
//   margin: 0;
// `;

// const CategoryItem = styled.li`
//   font-size: 1rem;
//   margin-bottom: 8px;
//   font-weight: 400;
//   color: #d3c3c3;
//   cursor: pointer;

//   &:hover {
//     color: #fff;
//     font-weight: bold;
//   }
// `;

// const SectionHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 1.2rem;
//   font-weight: bold;
// `;

// const SectionTitle = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// export const Sidebar: React.FC = () => {
//   const { genres, loading, error, tvGenres } = useMovies();
//   const [open, setOpen] = useState<boolean>(true);

//   if (loading) return <CategoryContainer>Ładowanie...</CategoryContainer>;
//   if (error) return <CategoryContainer>{error}</CategoryContainer>;

//   return (
//     <>
//       {open ? (
//         <SidebarContainer open={open}>
//           <ToggleButton onClick={() => setOpen(false)}>
//             <AiOutlineClose size={24} />
//           </ToggleButton>
//           <NavMenu>
//             <NavItem href="/films" open={open}>
//               <ImVideoCamera size={20} /> {open && "Films"}
//             </NavItem>
//             <NavItem href="/series" open={open}>
//               <RiMovie2Line size={20} /> {open && "Series"}
//             </NavItem>
//           </NavMenu>
//         </SidebarContainer>
//       ) : (
//         <CategoryContainer>
//           <ToggleButton onClick={() => setOpen(true)}>
//             <AiOutlineMenu size={24} />
//           </ToggleButton>

//           <SectionHeader>
//             <SectionTitle>
//               <ImVideoCamera size={20} />
//               <p>Films</p>
//             </SectionTitle>
//             <MdOutlineArrowDropDown />
//           </SectionHeader>
//           <CategoryList>
//             {genres.map((genre) => (
//               <CategoryItem key={genre.id}>{genre.name}</CategoryItem>
//             ))}
//           </CategoryList>

//           <SectionHeader>
//             <SectionTitle>
//               <RiMovie2Line size={20} />
//               <p>Series</p>
//             </SectionTitle>
//             <MdOutlineArrowDropDown />
//           </SectionHeader>
//           <CategoryList>
//             {tvGenres.map((genre) => (
//               <CategoryItem key={genre.id}>{genre.name}</CategoryItem>
//             ))}
//           </CategoryList>
//         </CategoryContainer>
//       )}
//     </>
//   );
// };
