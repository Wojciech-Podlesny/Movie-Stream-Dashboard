
export interface authProps {                            
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
  onAvatarClick: () => void;
}