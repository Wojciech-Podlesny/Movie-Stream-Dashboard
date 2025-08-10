"use client";

import { Navbar } from "@/components/Navbar";
import { LoginForm } from "@/components/LoginForm";
import { Footer } from "@/components/Footer";
import { FormContainer, PageMain, PageWrapper } from "@/styles/Layout.styled";

export default function Login() {
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
