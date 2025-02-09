'use client'

import { StreamSearch } from "./StreamSearch";
import { RiMovie2Line } from "react-icons/ri";
import {FaStar } from "react-icons/fa";
import { styled } from "styled-components";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";


const NavbarContainer = styled.div`
  background-color: #0d0d1d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
`;


export const Navbar = () => {

  const [open,setOpen] = useState(false)
  return (
    <NavbarContainer>
      <Logo>
        <RiMovie2Line size={32} />
        Movie
      </Logo>
      {/* {!open && (
        <h1>
          <Link href="/"></Link>
        </h1>
      )}

      <button
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <AiOutlineMenu size={24} />
        ) : (
          <AiOutlineClose size={24} />
        )}
      </button> */}

      <StreamSearch />
      <Actions>
        <FaStar />
        <Link href='/login'>Login</Link>
        <Link href='/register'>Register</Link>
      </Actions>
    </NavbarContainer>
  );
};
