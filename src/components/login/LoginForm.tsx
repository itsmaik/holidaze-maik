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
  const { register, handleSubmit, formState: {errors} } = useForm<TLoginFormInput>();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='mb-4'>
          <input className='outline w-full p-2 outline-gray-300 rounded-md focus:outline-blue-300'
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: 'Enter a valid email address',
              },
            })}
            placeholder="example@stud.noroff.no"
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        </div>

        <div className='mb-4'>
          <input className='outline w-full p-2 outline-gray-300 rounded-md focus:outline-blue-300'
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
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>

        <button type="submit" className='bg-black text-white text-xl p-2 w-full rounded-md font-semibold mb-2'>Login</button>
        {apiError && <p className='text-red-500 text-center'>{apiError}</p>}
      </form>
    </>
  );
};