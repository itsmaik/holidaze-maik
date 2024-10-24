import { useForm } from "react-hook-form" 
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { loginUser } from "@api/services/AuthServices";

type TLoginFormInput = {
  email: string;
  password: string;
}

export default function Login () {
  const {login} = useAuth();
  const { register, handleSubmit, formState: {errors} } =useForm<TLoginFormInput>();
  const [ error, setError ] = useState<string | null>(null);

  const onSubmit = async (data: TLoginFormInput)  => {
    try {
      const response = await loginUser(data.email, data.password);
      login(response.user, response.token)
    } catch (err) {
      if (err)
        setError("Invalid credentials, please try again.");
        console.log(err);
        
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: 'Enter a valid email address',
            },
          })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  )
};