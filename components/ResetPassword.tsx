"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, ForgotPasswordSchema } from "@/lib/validation";
import {
  Form,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  Title,
  Error,
  Message,
} from "@/styles/ResetPassword.styled";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from '@/lib/firebase';
import { useState } from "react";

export const ResetPassword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (
    data: ForgotPasswordFormData
  ) => {
    try {
      // await sendPasswordResetEmail(auth,data.email)
      setMessage("Message");
      setError(null);
    } catch (error) {
      console.error(error);
      setMessage(null);
      setError("Error");
      console.log(data)
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Reset Password</Title>
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" {...register("email")} />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </InputGroup>
      <SubmitButton type="submit">Reset Password</SubmitButton>
      {message && <Message>{message}</Message>}
      {error && <Error>{error}</Error>}
    </Form>
  );
};