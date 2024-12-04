import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { loginUser } from "@api/services/AuthServices";
import LoginForm from "./LoginForm";
import toast from "react-hot-toast";
import type { TLoginFormInput } from "src/types/loginTypes";

type TLoginProps = {
  onSuccess: () => void;
}

export default function Login({ onSuccess }: TLoginProps) {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: TLoginFormInput) => {
    try {
      const response = await loginUser(data.email, data.password);
      login(response.email, response.accessToken);
      setError(null);
      if (response) return toast.success("Login Successful") && onSuccess();
    } catch (err) {
      if (err instanceof Error)
        setError("You have entered an invalid email or password");
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} apiError={error} />
    </>
  );
}
