import { useForm } from "react-hook-form";
import useEditVenue from "./useEditVenue";
import { TCreateVenueFormInput } from "src/types/venueFormTypes";

type EditVenueFormProps = {
  venue: TCreateVenueFormInput & { id: string };
};

export default function EditVenueForm({ venue }: EditVenueFormProps) {

  console.log(venue);
  
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

      <div className='mb-4 flex flex-col items-start'>
        <label htmlFor="city">City <span className='text-red-500'>*</span></label>
        <input
          className='input'
          type='text'
          id="city"
          {...register("location.city", {
            required: "City is required",
          })}
          placeholder='City'
        />
        {errors.location?.city && (
          <p className='text-red-500'>{errors.location?.city.message}</p>
        )}
      </div>

      <div className='mb-4 flex flex-col items-start'>
        <label htmlFor="country">Country</label>
        <input
          className='input'
          type='text'
          id="country"
          {...register("location.country",)}
          placeholder='Country'
        />
        {errors.location?.country && (
          <p className='text-red-500'>{errors.location?.country.message}</p>
        )}
      </div>

      <div className='mb-4 flex flex-col items-start'>
        <label htmlFor="price">Price <span className='text-red-500'>*</span></label>
        <input
          className='input'
          type='text'
          id="price"
          {...register("price", {
            required: "Price is required",
            setValueAs: (value) => (value ? parseFloat(value) : undefined)
          })}
          placeholder='Price'
        />
        {errors.price && (
          <p className='text-red-500'>{errors.price.message}</p>
        )}
      </div>

      <div className='mb-4 flex flex-col items-start'>
        <label htmlFor="maxGuests">Max number of guests <span className='text-red-500'>*</span></label>
        <input
          className='input'
          type='text'
          id="maxGuests"
          {...register("maxGuests", {
            required: "Max number of guests is required",
            setValueAs: (value) => (value ? parseInt(value) : undefined)
          })}
          placeholder='guests'
        />
        {errors.maxGuests && (
          <p className='text-red-500'>{errors.maxGuests.message}</p>
        )}
      </div>

      <div className='mb-4 flex flex-col items-start'>
        <label htmlFor="rating">Rating</label>
        <input
          className='input'
          type='number'
          id="rating"
          {...register("rating", {
            setValueAs: (value) => (value ? parseFloat(value) : undefined),
          })}
          min="0"
          max="5"
          placeholder='rating'
        />
        {errors.rating && (
          <p className='text-red-500'>{errors.rating.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white text-xl p-2 w-full rounded-md font-semibold mt-4 mb-2"
      >
        Update Venue
      </button>
    </form>
  );
}
