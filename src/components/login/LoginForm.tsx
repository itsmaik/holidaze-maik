import { useForm } from 'react-hook-form';


type TLoginFormInput = {
  email: string;
  password: string;
}

type TLoginFormProps = {
  onSubmit: (data: TLoginFormInput) => void;
  apiError: string | null;
}

export default function LoginForm ({onSubmit, apiError}: TLoginFormProps) {
  const { register, handleSubmit, formState: {errors} } =useForm<TLoginFormInput>();

  return (
    <div>
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
        {apiError && <p>{apiError}</p>}
      </form>
    </div>
  )
};