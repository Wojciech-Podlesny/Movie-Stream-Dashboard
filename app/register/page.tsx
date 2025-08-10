"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/RegisterForm";
import { FormContainer, PageMain, PageWrapper } from "@/styles/Layout.styled";

export default function Register() {
  return (
    <PageWrapper>
      <Navbar />
      <PageMain>
        <FormContainer>
          <RegisterForm />
        </FormContainer>
      </PageMain>
      <Footer />
    </PageWrapper>
  );
}
