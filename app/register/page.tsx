'use client'
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { RegisterForm } from "@/components/RegisterForm";


 const Register = () => {
  return (
    <>
      <Navbar />
      <RegisterForm />
      <Footer />
    </>
  );
};

export default Register