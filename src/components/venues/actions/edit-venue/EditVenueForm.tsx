import { useForm } from "react-hook-form";
import useEditVenue from "./useEditVenue";
import { TCreateVenueFormInput } from "src/types/venueFormTypes";

type EditVenueFormProps = {
  venue: TCreateVenueFormInput & { id: string };
};

export default function EditVenueForm({ venue }: EditVenueFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCreateVenueFormInput>({
    defaultValues: {
      ...venue,
      media: venue.media.map((mediaItem) => mediaItem.url),
    },
  });

  const { editVenue } = useEditVenue();

  const onSubmit = (data: TCreateVenueFormInput) => {
    editVenue({ ...data, id: venue.id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Form Fields (Similar to CreateVenueForm) */}
      <div className="mb-4 flex flex-col items-start">
        <label htmlFor="name">Name <span className="text-red-500">*</span></label>
        <input
          className="input"
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4 flex flex-col items-start">
        <label htmlFor="description">Description <span className="text-red-500">*</span></label>
        <textarea
          className="input"
          id="description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      {/* Media Field */}
      <div className="mb-4 flex flex-col items-start">
        <label htmlFor="media">Image URL <span className="text-red-500">*</span></label>
        <input
          className="input"
          type="url"
          id="media"
          {...register("media.0", {
            required: "Image URL is required",
            pattern: {
              value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
              message: "Please enter a valid URL",
            },
          })}
        />
        {errors.media?.[0] && <p className="text-red-500">{errors.media[0]?.message}</p>}
      </div>

      {/* Additional fields (city, country, price, etc.) */}
      {/* Similar structure as CreateVenueForm */}

      <button
        type="submit"
        className="bg-black text-white text-xl p-2 w-full rounded-md font-semibold mt-4 mb-2"
      >
        Update Venue
      </button>
    </form>
  );
}
