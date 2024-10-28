import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { loginUser } from "@api/services/AuthServices";
import LoginForm from "./LoginForm";

type TLoginFormInput = {
  email: string;
  password: string;
}

export default function Login () {
  const { login } = useAuth();
  const [ error, setError ] = useState<string | null>(null);

  const handleLogin = async (data: TLoginFormInput)  => {
    try {
      const response = await loginUser(data.email, data.password);
      login(response.user, response.token)
      setError(null);
      if (response) return console.log('Login successful', response);
    } catch (err) {
      if (err instanceof Error)
        setError("You have entered an invalid email or password");
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} apiError={error} />
    </>
  )
};