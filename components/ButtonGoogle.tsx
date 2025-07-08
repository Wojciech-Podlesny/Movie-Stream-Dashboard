

import { signInWithGoogle } from "@/lib/firebase/auth";


export default function GoogleLoginButton() {
  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Login user", user.email);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleLogin} className="p-2 rounded bg-blue-600 text-white">
      Google
    </button>
  );
}
