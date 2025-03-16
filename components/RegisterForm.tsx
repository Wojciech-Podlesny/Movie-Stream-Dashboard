"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterFormData, RegisterSchema } from "@/lib/validation";
import {
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  FormContainer,
  StyledForm,
  Section,
  Title,
} from "@/styles/RegisterForm.styled";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

import Link from "next/link";


export const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (
    data: RegisterFormData
  ) => {
    console.log(data);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <FormContainer>
      <Title>Sign Up</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label htmlFor="username">Name</Label>
          <Input type="text" placeholder="Username" {...register("username")} />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </InputGroup>

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

        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </InputGroup>
        <SubmitButton type="submit">Sign up</SubmitButton>
        <Section>
          <Link href="/">Back home</Link>
          <Link href="/login">Sign in</Link>
        </Section>
      </StyledForm>
    </FormContainer>
  );
};
