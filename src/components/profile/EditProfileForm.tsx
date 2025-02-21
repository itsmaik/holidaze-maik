import { useForm } from "react-hook-form";
import useEditProfile from "./useEditProfile";
import { useAuth } from "@hooks/useAuth";

type TEditProfileForm = {
  avatarUrl: string;
  avatarAlt: string;
};

export default function EditProfileForm() {
  const { userName } = useAuth();
  const { editProfile, isLoading } = useEditProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditProfileForm>({
    defaultValues: {
      avatarUrl: "",
      avatarAlt: "",
    },
  });

  const onSubmit = (data: TEditProfileForm) => {
    const { avatarUrl, avatarAlt } = data;
    editProfile({ email: userName as string, avatar: { url: avatarUrl, alt: avatarAlt } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Avatar URL */}
      <div className="mb-4 flex flex-col items-start">
        <label htmlFor="avatarUrl">
          Avatar URL
        </label>
        <input
          type="url"
          id="avatarUrl"
          {...register("avatarUrl", {
            required: "Avatar URL is required",
            pattern: {
              value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
              message: "Please enter a valid URL",
            },
          })}
          placeholder='image URL'
          className="input"
        />
        {errors.avatarUrl && <p className="text-red-500">{errors.avatarUrl.message}</p>}
      </div>

      {/* Avatar Alt */}
      <div className="mb-4 flex flex-col items-start">
        <label htmlFor="avatarAlt">
          Avatar Alt Text
        </label>
        <input
          type="text"
          id="avatarAlt"
          {...register("avatarAlt", {
            required: "Avatar alt text is required",
          })}
          className="input"
          placeholder='Avatar alt text'
        />
        {errors.avatarAlt && <p className="text-red-500">{errors.avatarAlt.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="' text-white bg-black text-xl p-2 w-full rounded-md font-semibold mt-4 mb-2"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Avatar"}
      </button>
    </form>
  );
}
