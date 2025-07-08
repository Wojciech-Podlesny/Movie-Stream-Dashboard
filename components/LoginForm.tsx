"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  LoginSchema,
  type LoginFormData,
} from "@/lib/validation/user-validation";
import { useState } from "react";
// import GoogleLoginButton from "./ButtonGoogle";



export const LoginForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoginError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setLoginError("Invalid email or password");
    } else {
      window.location.href = "/";
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google')
  }

  return (
    <Box
      maxWidth="400px"
      mx="auto"
      my="12rem"
      p={4}
      bgcolor="#f9f9f9"
      borderRadius="8px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Typography variant="h5" align="center" mb={2} color="#333">
        Sign in
      </Typography>

      {loginError && (
        <Typography variant="h6" align="center" mb={2} color="error">
          {loginError}
        </Typography>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField
          label="Email"
          fullWidth
          type="email"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          
          fullWidth
          sx={{
            py: "0.75rem",
            fontWeight: "bold",
            backgroundColor: "#a0aebe",
            "&:hover": { backgroundColor: "#c3cbd3" },
            "&:disabled": { backgroundColor: "#ccc", cursor: "not-allowed" },
          }}
        >
          Sign in
        </Button>
          <Button
          type="submit"
          variant="contained"
          onClick={handleGoogleLogin}
          fullWidth
          sx={{
            py: "0.75rem",
            fontWeight: "bold",
            backgroundColor: "#0070f3",
            "&:hover": { backgroundColor: "#005bb5" },
            "&:disabled": { backgroundColor: "#ccc", cursor: "not-allowed" },
          }}
        >
          Google
        </Button>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <MuiLink component={Link} href="/" underline="hover">
            Back home
          </MuiLink>
          <MuiLink component={Link} href="/reset-password" underline="hover">
            Forgot password?
          </MuiLink>
        </Box>
        {/* <GoogleLoginButton /> */}
      </Box>
  );
};
