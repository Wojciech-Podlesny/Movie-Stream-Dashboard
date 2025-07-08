"use client";
import { Avatar, IconButton } from "@mui/material";

interface User {
  name?: string;
  email?: string;
  image?: string;
}

interface UserAvatarProps {
  user: User;
  onClick: () => void;
}

const stringAvatar = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return {
    children: initials,
    sx: {
      bgcolor: "#333",
      color: "#fff",
      width: 36,
      height: 36,
      fontSize: 16,
    },
  };
};

export const UserAvatar = ({ user, onClick }: UserAvatarProps) => (
  <IconButton
    onClick={onClick}
    sx={{
      ml: 1,
      transition: "transform 0.2s ease-in-out",
      "&:hover": { transform: "scale(1.1)" },
    }}
  >
    <Avatar
      {...(user?.image
        ? {
            src: user.image,
            alt: user.name || "User",
            sx: { width: 36, height: 36 },
          }
        : stringAvatar(user?.name || user?.email || "U"))}
    />
  </IconButton>
);
