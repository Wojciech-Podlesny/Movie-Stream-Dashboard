"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import {
  ForgotPasswordFormData,
  ForgotPasswordSchema,
} from "@/lib/validation/users/ForgotPasswordSchema";

export const ResetPassword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage("Password reset link sent! Check your inbox.");
      setError(null);
      reset();
    } catch (err) {
      console.error(err);
      setMessage(null);
      setError("Something went wrong. Please try again.");
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
      <Typography variant="h5" align="center" color="text.primary">
        Reset password
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        mt={1}
        mb={3}
      >
        Enter your email and we’ll send you a reset link.
      </Typography>

      {message && (
        <Alert severity="success" variant="outlined" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>
          {error}
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
          type="email"
          fullWidth
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
          {isSubmitting ? <CircularProgress size={22} /> : "Send reset link"}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <MuiLink component={Link} href="/" underline="hover" variant="body2">
          Back home
        </MuiLink>
        <MuiLink component={Link} href="/login" underline="hover" variant="body2">
          Back to sign in
        </MuiLink>
      </Box>
    </Box>
  );
};
