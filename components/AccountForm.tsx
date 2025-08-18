"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Stack,
  Paper,
} from "@mui/material";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase/firebase";
import { getSession } from "next-auth/react";
import { showErrorToast } from "./ErrorToast";
import { useRouter } from "next/navigation";
import { AccountFormData, AccountFormSchema } from "@/lib/validation/users/AccountFormSchema";
import { LoadingState } from "@/utils/renderStates";

export const AccountForm = () => {
  const auth = getAuth(app);

  const [session, setSession] = useState<Awaited<ReturnType<typeof getSession>> | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error" | "info">("info");

  // Password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<AccountFormData>({
    resolver: zodResolver(AccountFormSchema),
  });

  useEffect(() => {
    getSession().then((s) => setSession(s));
  }, []);

  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || "");
      setValue("displayName", session.user.name || "");
      setLoading(false);
    }
  }, [session, setValue]);

  const openSnack = (msg: string, severity: "success" | "error" | "info" = "info") => {
    setSnackMsg(msg);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const onSubmit = async (data: AccountFormData) => {
    try {
      if (!session?.user?.idToken) {
        throw new Error("Session is not loaded or invalid.");
      }

      const responseUpdate = await fetch("/api/account/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName: data.displayName }),
      });

      const responseChange = await fetch("/api/account/change-password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: data.newPassword }),
      });

      const responseDataUpdate = await responseUpdate.json().catch(() => ({}));
      const responseDataChange = await responseChange.json().catch(() => ({}));

      if (!responseUpdate.ok || !responseChange.ok) {
        throw new Error(
          responseDataUpdate?.error || responseDataChange?.error || "An error occurred"
        );
      }

      await auth.currentUser?.reload();
      setValue("displayName", auth.currentUser?.displayName || "");

      openSnack("Profile updated and password changed.", "success");
      reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      openSnack(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      const responseDelete = await fetch("/api/account/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.idToken}`,
          "Content-Type": "application/json",
        },
      });

      // Uwaga: sprawdzamy status HTTP, a nie tylko payload
      if (!responseDelete.ok) {
        const errPayload = await responseDelete.json().catch(() => ({}));
        throw new Error(errPayload?.error || "Failed to delete account.");
      }

      showErrorToast("Your account has been deleted");
      router.push("/");
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  if (loading) return <LoadingState message="Loading account info" />;

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 520,
        mx: "auto",
        mt: { xs: 6, sm: 8 },
        mb: { xs: 8, sm: 10 },
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        boxShadow: "0 6px 28px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h5" align="center" color="text.primary" mb={0.5}>
        Account settings
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" mb={3}>
        Update your profile and change your password.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2.5}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Display name"
            fullWidth
            {...register("displayName")}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="subtitle1" color="text.primary">
            Change password
          </Typography>

          <TextField
            label="Current password"
            type={showCurrent ? "text" : "password"}
            fullWidth
            {...register("currentPassword")}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                    onClick={() => setShowCurrent((v) => !v)}
                    edge="end"
                  >
                    {showCurrent ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="New password"
            type={showNew ? "text" : "password"}
            fullWidth
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showNew ? "Hide password" : "Show password"}
                    onClick={() => setShowNew((v) => !v)}
                    edge="end"
                  >
                    {showNew ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm new password"
            type={showConfirm ? "text" : "password"}
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showConfirm ? "Hide password" : "Show password"}
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
            variant="contained"
            fullWidth
            disabled={isSubmitting || !session}
            sx={{
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#1e88e5",
              "&:hover": { backgroundColor: "#1565c0" },
              "&:disabled": { backgroundColor: "#cfd8dc" },
            }}
          >
            {isSubmitting ? <CircularProgress size={22} /> : "Save changes"}
          </Button>
        </Stack>
      </form>

      <Divider sx={{ my: 4 }} />

      <Box
        p={2}
        borderRadius={2}
        sx={{
          bgcolor: "rgba(244, 67, 54, 0.06)", // soft error tint
          border: "1px solid rgba(244, 67, 54, 0.2)",
        }}
      >
        <Typography variant="subtitle1" color="error" mb={1}>
          Danger zone
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Deleting your account is permanent and cannot be undone.
        </Typography>
        <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
          Delete account
        </Button>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
