"use client";

import { StreamSearch } from "./StreamSearch";
import { RiMovie2Line } from "react-icons/ri";
import Link from "next/link";
import { Actions, Logo, NavbarContainer } from "@/styles/Navbar.styled";


export const Navbar = () => {
  
  return (
    <NavbarContainer>
      <Logo>
        <RiMovie2Line size={32} />
        Movie
      </Logo>
      <StreamSearch />
      <Actions>
        <p>
          <Link href="/login">Login</Link>
        </p>

        <p>
          <Link href="/register">Register</Link>
        </p>
      </Actions>
    </NavbarContainer>
  );
};
