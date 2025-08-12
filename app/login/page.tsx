"use client";

import { Navbar } from "@/components/Navbar";
import { LoginForm } from "@/components/LoginForm";
import { Footer } from "@/components/Footer";
import { FormContainer, PageMain, PageWrapper } from "@/styles/Layout.styled";

const Login = () => {
  return (
    <PageWrapper>
      <Navbar />
      <PageMain>
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </PageMain>
      <Footer />
    </PageWrapper>
  );
}

export default Login;