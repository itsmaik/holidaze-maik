import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { registerUser } from '@api/services/AuthServices';
import RegisterForm from './RegisterForm';
import { TRegisterFormInput } from 'src/types/registerTypes';
import toast from 'react-hot-toast';

export default function Register () {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (userData: TRegisterFormInput) => {
    try {
      const response = await registerUser({userData});
      if (response) return toast.success("User registered Successfully");
      login(response.user, response.token);
      navigate('/');
    } catch (err) {
      if(err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors[0].message)
      } else if (err instanceof Error) {
        setError("Registration failed. Please try again!");
      }
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} apiError={error} />
    </div>
  );
};
