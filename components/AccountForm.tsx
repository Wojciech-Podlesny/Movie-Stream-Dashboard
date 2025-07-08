"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase/firebase";

const schema = z
  .object({
    displayName: z.string().min(1, "Display name is required"),
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export const AccountForm = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setValue("displayName", user.displayName || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const res1 = await fetch("/api/account/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: data.displayName }),
      });

      const res2 = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const r1 = await res1.json();
      const r2 = await res2.json();

      if (!res1.ok || !res2.ok) {
        throw new Error(r1.error || r2.error || "An error occurred");
      }

      setMessage("Profile updated and password changed.");
      setOpen(true);
      reset();
    } catch (error) {
      setMessage(`${error}, error`);
      setOpen(true);
    }
  };

  return (
    <Box
      maxWidth="480px"
      mx="auto"
      mt="6rem"
      p={4}
      bgcolor="#f9f9f9"
      borderRadius="8px"
      boxShadow="0 4px 6px rgba(0,0,0,0.1)"
    >
      <Typography variant="h5" align="center" mb={2}>
        Account Settings
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          fullWidth
          value={email}
          disabled
          sx={{ mb: 2 }}
        />

        <TextField
          label="Display Name"
          fullWidth
          {...register("displayName")}
          error={!!errors.displayName}
          helperText={errors.displayName?.message}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" mb={1}>
          Change Password
        </Typography>

        <TextField
          label="Current Password"
          type="password"
          fullWidth
          {...register("currentPassword")}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </Button>
      </form>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        message={message}
        autoHideDuration={4000}
      />
      <Box mt={4}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={async () => {
            if (
              !confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
              )
            )
              return;

            const res = await fetch("/api/account/delete", { method: "POST" });
            const data = await res.json();

            if (res.ok) {
              alert("Your account has been deleted.");
              window.location.href = "/";
            } else {
              alert(data.error);
            }
          }}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );
};
