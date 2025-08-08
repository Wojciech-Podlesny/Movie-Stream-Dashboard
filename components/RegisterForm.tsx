"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "./ErrorToast";
import { RegisterFormData, RegisterSchema } from "@/lib/validation/users/RegisterSchema";

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.username,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }

      await signInWithEmailAndPassword(auth, data.email, data.password);

      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        showSuccessToast("Verification email sent. Please check your inbox.");
      }
      reset();
      router.push("/login");
    } catch (error) {
      console.error("Register error:", error);
      showErrorToast(error instanceof Error ? error.message : "Registration failed");
      router.push("/register")
    }
  };

  return (
    <Box
      maxWidth="400px"
      mx="auto"
      mt="12rem"
      mb="12rem"
      p={4}
      bgcolor="#f9f9f9"
      borderRadius="8px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Typography variant="h5" align="center" mb={2} color="#333">
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField
          label="Username"
          fullWidth
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          fullWidth
          sx={{
            py: "0.75rem",
            fontWeight: "bold",
            backgroundColor: "#0070f3",
            "&:hover": { backgroundColor: "#005bb5" },
            "&:disabled": { backgroundColor: "#ccc", cursor: "not-allowed" },
          }}
        >
          Sign up
        </Button>
        <Box display="flex" justifyContent="space-between">
          <MuiLink component={Link} href="/" underline="hover">
            Back home
          </MuiLink>
          <MuiLink component={Link} href="/login" underline="hover">
            Sign in
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};
