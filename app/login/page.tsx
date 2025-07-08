"use client";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { Navbar } from "@/components/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};

export default Login;
