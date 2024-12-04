import { useForm } from "react-hook-form";
import { TLoginFormInput } from "src/types/loginTypes";

type TLoginFormProps = {
  onSubmit: (data: TLoginFormInput) => void;
  apiError: string | null;
};

export default function LoginForm({ onSubmit, apiError }: TLoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormInput>();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='mb-4'>
          <input
            className='input'
            type='email'
            id='email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder='example@stud.noroff.no'
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <input
            className='input'
            type='password'
            id='password'
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder='Password'
          />
          {errors.password && (
            <p className='text-red-500'>{errors.password.message}</p>
          )}
        </div>

        <button
          type='submit'
          className='bg-black text-white text-xl p-2 w-full rounded-md font-semibold mb-2'
        >
          Login
        </button>
        {apiError && <p className='text-red-500 text-center'>{apiError}</p>}
      </form>
    </>
  );
}
