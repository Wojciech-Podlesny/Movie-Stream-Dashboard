"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { ForgotPasswordFormData, ForgotPasswordSchema } from "@/lib/validation/users/ForgotPasswordSchema";

export const ResetPassword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data:ForgotPasswordFormData) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage("Password reset link sent! Check your inbox.");
      setError(null);
    } catch (err) {
      console.error(err);
      setMessage(null);
      setError("Something went wrong. Please try again.");
    
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="400px"
      mx="auto"
      my="12rem"
      p={4}
      borderRadius={2}
      bgcolor="#f9f9f9"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Typography variant="h5" align="center" mb={1} color="#333">
        Reset Password
      </Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        variant="outlined"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
        sx={{
          py: "0.75rem",
          fontWeight: "bold",
          backgroundColor: "#0070f3",
          "&:hover": { backgroundColor: "#005bb5" },
          "&:disabled": { backgroundColor: "#ccc", cursor: "not-allowed" },
        }}
      >
        Reset Password
      </Button>

      {message && (
        <Typography sx={{ color: "green", fontSize: "0.875rem", textAlign: "center" }}>
          {message}
        </Typography>
      )}

      {error && (
        <Typography sx={{ color: "red", fontSize: "0.875rem", textAlign: "center" }}>
          {error}
        </Typography>
      )}

      <Box textAlign="center" mt={1}>
        <MuiLink component={Link} href="/" underline="hover">
          Back home
        </MuiLink>
      </Box>
    </Box>
  );
};

