"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterFormData } from "@/lib/validation/user-validation";
import {Box,TextField,Button,Typography,Link as MuiLink,} from "@mui/material";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/login");
    } catch (error) {
      console.log("Error", error);
    }
  };

  //   const handleRegister = async () => {
  //   const res = await fetch('/api/account/register', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const data = await res.json();
  //   if (res.ok) alert('Zarejestrowano!');
  //   else alert(data.error);
  // };


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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
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
