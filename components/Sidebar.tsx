import { fetchMoviesInitial } from "@/app/store/moviesSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  CategoriesContainer,
  CategoriesContainerStyled,
  NavItem,
  NavMenu,
  SidebarContainer,
  ToggleButton,
} from "@/styles/Sidebar.styled";
import { useEffect, useState } from "react";
import { ImVideoCamera } from "react-icons/im";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesSection } from "./CategoriesSection";
import {HiMiniArrowLeftStartOnRectangle} from "react-icons/hi2";

export const Sidebar = () => {
  const [openFilms, setOpenFilms] = useState<boolean>(true);
  const [openSidebar, setOpenSIdebar] = useState<boolean>(true);
  const [openSeries, setOpenSeries] = useState<boolean>(false);
  const { error, loading, seriesCategories, moviesCategories } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMoviesInitial());
  }, [dispatch]);

  if (loading) return <CategoriesContainer>Loading..</CategoriesContainer>; // Spinner
  if (error) return <CategoriesContainer>{error}</CategoriesContainer>; // ?dialog
  // CollapsedSidebar i ExpandedSidebar
  return (
    <>
      {openSidebar ? (
        <SidebarContainer open={openSidebar}>
          <ToggleButton onClick={() => setOpenSIdebar(prev => !prev)}>
          <HiMiniArrowLeftStartOnRectangle size={30} />
          </ToggleButton>
          <NavMenu>
            <NavItem href="/movies" open={openSidebar}>
              <ImVideoCamera size={20} /> {openSidebar && "Movies"}
            </NavItem>
            <NavItem href="/series" open={openSidebar}>
              <RiMovie2Line size={20} /> {openSidebar && "Series"}
            </NavItem>
          </NavMenu>
        </SidebarContainer>
      ) : (
        <CategoriesContainerStyled open={!openSidebar}>
          <ToggleButton onClick={() => setOpenSIdebar(!openSidebar)}>
          <HiMiniArrowLeftStartOnRectangle size={30} />
          </ToggleButton>
          <CategoriesSection
            title="Movies"
            icon={ImVideoCamera}
            categories={moviesCategories}
            isOpen={openFilms}
            setIsOpen={setOpenFilms}
          ></CategoriesSection>

          <CategoriesSection
            title="Series"
            icon={RiMovie2Line}
            categories={seriesCategories}
            isOpen={openSeries}
            setIsOpen={setOpenSeries}
          ></CategoriesSection>
        </CategoriesContainerStyled>
      )}
    </>
  );
}