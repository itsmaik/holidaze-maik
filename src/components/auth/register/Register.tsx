import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { registerUser } from "@api/services/AuthServices";
import RegisterForm from "./RegisterForm";
import { TRegisterFormInput } from "src/types/registerTypes";
import toast from "react-hot-toast";

type TRegisterProps = {
  onSuccess: () => void;
};

export default function Register({ onSuccess }: TRegisterProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (userData: TRegisterFormInput) => {
    try {
      const response = await registerUser({ userData });
      if (response) {
        toast.success("User registered successfully");
        login(response.email, response.accessToken, response.name);
        onSuccess();
        navigate("/");
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors[0].message);
      } else if (err instanceof Error) {
        setError("Registration failed. Please try again!");
      }
    }
  };

  return <RegisterForm onSubmit={handleRegister} apiError={error} />;
}
