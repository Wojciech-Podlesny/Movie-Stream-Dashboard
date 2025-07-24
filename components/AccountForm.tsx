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
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth} from "firebase/auth";
import { app } from "@/lib/firebase/firebase";
import { getSession } from "next-auth/react";
import { showErrorToast } from "./ErrorToast";
import { useRouter } from "next/navigation";
import { AccountFormData,accountFormSchema } from "@/lib/validation/user-validation";

export const AccountForm = () => {
  const auth = getAuth(app);

  const [session, setSession] = useState<Awaited<ReturnType<typeof getSession>> | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter()

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
  setValue,
} = useForm<AccountFormData>({
  resolver: zodResolver(accountFormSchema),
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
        body: JSON.stringify({
          newPassword: data.newPassword,
        }),
      });

      const r1 = await responseUpdate.json();
      const r2 = await responseChange.json();

      if (!responseUpdate.ok || !responseChange.ok) {
        throw new Error(r1.error || r2.error || "An error occurred");
      }

      await auth.currentUser?.reload();
      setValue("displayName", auth.currentUser?.displayName || "");

      setMessage("Profile updated and password changed.");
      setOpen(true);
      reset();
    } catch (error) {
      setMessage(`${error} error`);
      setOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.idToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        showErrorToast("Your account has been deleted");
        router.push("/"); 
        
      } else {
        showErrorToast(data.error || "Failed to delete account.");
      }
    } catch (err) {
      showErrorToast(`${err} Unexpected error`);
    }
  };

  if (loading) {
    return (
      <Typography align="center" mt={8}>
        Loading account info...
      </Typography>
    );
  }

  return (
    <Box
      maxWidth="480px"
      mx="auto"
      mt="6rem"
      mb="4rem"
      p={4}
      bgcolor="#f9f9f9"
      borderRadius="8px"
      boxShadow="0 4px 6px rgba(0,0,0,0.1)"
    >
      <Typography variant="h5" align="center" mb={2}>
        Account Settings
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField label="Email" fullWidth value={email} disabled sx={{ mb: 2 }} />

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
          disabled={isSubmitting || !session}
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </Button>
      </form>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        message={message}
        autoHideDuration={4000}
      />

      <Divider sx={{ my: 4 }} />

      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={handleDelete}
      >
        Delete Account
      </Button>
    </Box>
  );
};
