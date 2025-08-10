"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, LoginSchema } from "@/lib/validation/users/LoginSchema";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

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
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <Box
      maxWidth={420}
      mx="auto"
      my={{ xs: 8, sm: 10 }}
      p={{ xs: 3, sm: 4 }}
      bgcolor="white"
      borderRadius={3}
      boxShadow="0 6px 28px rgba(0, 0, 0, 0.08)"
    >
      <Typography variant="h5" align="center" mb={1.5} color="text.primary">
        Sign in
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" mb={3}>
        Welcome back! Please enter your details.
      </Typography>

      {loginError && (
        <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2.5}
      >
        <TextField
          label="Email"
          fullWidth
          type="email"
          variant="outlined"
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined fontSize="small" />
              </InputAdornment>
            ),
          }}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          fullWidth
          type={showPassword ? "text" : "password"}
          variant="outlined"
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined fontSize="small" />
              </InputAdornment>
            ),
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
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
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
          {isSubmitting ? <CircularProgress size={22} /> : "Sign in"}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }}>or</Divider>

      <Button
        type="button"
        variant="outlined"
        onClick={handleGoogleLogin}
        fullWidth
        startIcon={<FcGoogle size={22} />}
        sx={{
          py: 1.2,
          fontWeight: 500,
          textTransform: "none",
          borderColor: "#e0e0e0",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#c7c7c7",
          },
        }}
      >
        Continue with Google
      </Button>

      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontSize="0.9rem"
      >
        <MuiLink component={Link} href="/" underline="hover">
          Back home
        </MuiLink>
        <MuiLink component={Link} href="/reset-password" underline="hover">
          Forgot password?
        </MuiLink>
      </Box>
    </Box>
  );
};
