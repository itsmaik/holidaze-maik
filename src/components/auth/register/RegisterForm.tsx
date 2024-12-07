import { useForm } from "react-hook-form";
import { useState } from "react";
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
  const [selectedRole, setSelectedRole] = useState("customer");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormInput>({
    defaultValues: userData,
  });

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='mb-4'>
          <label htmlFor="name">Name</label>
          <input
            className='input'
            type='text'
            id='name'
            {...register("name", { required: "Name is required" })}
            placeholder='Name'
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="email">Email</label>
          <input
            className='input'
            type='email'
            id="email"
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
          <label htmlFor="password">Password</label>
          <input
            className='input'
            type='password'
            id="password"
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

        <div className='mb-4 flex flex-col items-center space-y-4'>
          <label htmlFor="customer" className="flex items-center space-x-2">
            <input
              id="customer"
              checked={selectedRole === "customer"}
              onChange={() => handleRoleChange("customer")}
              className='w-5 h-5 accent-blue-600 cursor-pointer'
              type='checkbox'
            />
            <span className="text-gray-700 text-lg">Register as Customer</span>
          </label>

          <label htmlFor="venueManager" className="flex items-center space-x-2">
            <input
              className='w-5 h-5 accent-blue-600 cursor-pointer'
              type='checkbox'
              id="venueManager"
              {...register("venueManager")}
              checked={selectedRole === "venueManager"}
              onChange={() => handleRoleChange("venueManager")}
            />
            <span className="text-gray-700 text-lg">Register as Venue Manager</span>
          </label>
          {errors.venueManager && (
            <p className='text-red-500'>{errors.venueManager.message}</p>
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
