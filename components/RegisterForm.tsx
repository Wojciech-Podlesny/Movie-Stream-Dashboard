"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "./ErrorToast";
import {
  RegisterFormData,
  RegisterSchema,
} from "@/lib/validation/users/RegisterSchema";

export const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        const payload = await response.json();
        throw new Error(payload.error || "Registration failed");
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
      showErrorToast(
        error instanceof Error ? error.message : "Registration failed"
      );
      router.push("/register");
    }
  };

  return (
    <Box
      maxWidth={420}
      mx="auto"
      mt={{ xs: 6, sm: 10 }}
      mb={{ xs: 8, sm: 12 }}
      p={{ xs: 3, sm: 4 }}
      bgcolor="white"
      borderRadius={3}
      boxShadow="0 6px 28px rgba(0,0,0,0.08)"
    >
      <Typography variant="h5" align="center" mb={1.5} color="text.primary">
        Create account
      </Typography>
      <Typography
        variant="body2"
        align="center"
        mb={3}
        color="text.secondary"
      >
        Join us in less than a minute.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2.5}
      >
        <TextField
          label="Username"
          fullWidth
          autoComplete="username"
          variant="outlined"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          autoComplete="email"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          autoComplete="new-password"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          fullWidth
          autoComplete="new-password"
          variant="outlined"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirm ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowConfirm((v) => !v)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          fullWidth
          sx={{
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            backgroundColor: "#1e88e5",
            "&:hover": { backgroundColor: "#1565c0" },
            "&:disabled": { backgroundColor: "#cfd8dc" },
          }}
        >
          Create account
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <MuiLink component={Link} href="/" underline="hover" variant="body2">
          Back home
        </MuiLink>
        <Typography variant="body2" color="text.secondary">
          Have an account?{" "}
          <MuiLink component={Link} href="/login" underline="hover">
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};
