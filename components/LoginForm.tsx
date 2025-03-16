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
  FormContainer,
  StyledForm,
  Title,
  Section,
} from "@/styles/LoginForm.styled";
import { signIn } from "next-auth/react";
import Link from "next/link";

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
        <Section>
          <Link href="/">Back home</Link>
          <Link href="/reset-password">Forgot password?</Link>
        </Section>
      </StyledForm>
    </FormContainer>
  );
};
