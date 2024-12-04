import { useForm } from "react-hook-form";
import { TRegisterFormInput } from "src/types/registerTypes";

type TRegisterFormProps = {
  onSubmit: (data: TRegisterFormInput) => void;
  userData?: TRegisterFormInput;
  apiError?: string | null;
};

export default function RegisterForm({
  onSubmit,
  userData,
  apiError,
}: TRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormInput>({
    defaultValues: userData,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='mb-4'>
          <input
            className='input'
            type='text'
            id='email'
            {...register("name", { required: "Name is required" })}
            placeholder='Name'
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='mb-4'>
          <input
            className='input'
            type='email'
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
          Register
        </button>
        {apiError && <p className='text-red-500 text-center'>{apiError}</p>}
      </form>
    </>
  );
}
