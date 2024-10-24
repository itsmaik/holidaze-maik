import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { loginUser } from "@api/services/AuthServices";
import LoginForm from "./LoginForm";

type TLoginFormInput = {
  email: string;
  password: string;
}

export default function Login () {
  const {login} = useAuth();
  const [ error, setError ] = useState<string | null>(null);

  const handleLogin = async (data: TLoginFormInput)  => {
    try {
      const response = await loginUser(data.email, data.password);
      login(response.user, response.token)
      setError(null);
    } catch (err) {
      if (err)
        setError("Invalid credentials, please try again.");
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} apiError={error} />
    </>
  )
};