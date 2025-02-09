"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, type LoginFormData } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
} from "@/styles/LoginForm.styled";
import { signIn } from "next-auth/react";
import { styled } from "styled-components";


const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


export const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData
  ) => {
    console.log(data);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <FormContainer>
      <Title>Sign in</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputGroup>
        <SubmitButton type="submit">Sign in</SubmitButton>
        {/* <LinkPassword>
          <Link href="/reset-password">Forgot your password?</Link>
        </LinkPassword> */}
      </StyledForm>
    </FormContainer>
  );
};


