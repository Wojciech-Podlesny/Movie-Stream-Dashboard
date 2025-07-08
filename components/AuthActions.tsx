import Link from "next/link";
import { Button } from "@mui/material";
import { UserAvatar } from "./UserAvatar";

interface Props {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
  onAvatarClick: () => void;
}

export const AuthActions = ({ session, onAvatarClick }: Props) => {
  if (!session?.user) {
    return (
      <>
        <Link href="/login" passHref>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: "#fff",
              color: "#fff",
              fontWeight: 500,
              "&:hover": {
                borderColor: "#aaa",
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Login
          </Button>
        </Link>

        <Link href="/register" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#0d0d1d",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Register
          </Button>
        </Link>
      </>
    );
  }

  return (
    <UserAvatar
      user={{
        name: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
        image: session.user.image ?? undefined,
      }}
      onClick={onAvatarClick}
    />
  );
};
