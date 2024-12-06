import { useForm } from "react-hook-form";
import { TCreateVenueFormInput } from "src/types/venueFormTypes";
import useCreateVenue from "./useCreateVenue";


export default function CreateVenueForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateVenueFormInput>();
  const {createVenue} = useCreateVenue();

  const onSubmit = (data) => {
    createVenue(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className='mb-4'>
          <label htmlFor="name">Name <span className='text-red-500'>*</span></label>
          <input
            className='input'
            type='text'
            id='name'
            {...register("name", { required: "Name is required" })}
            placeholder='Venue name'
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="description">Description <span className='text-red-500'>*</span></label>
          <textarea
            className='input'
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder='Venue description'
          />
          {errors.description && (
            <p className='text-red-500'>{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="media">Image URL <span className='text-red-500'>*</span></label>
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
            placeholder="Enter image URL"
          />
          {errors.media?.[0] && (
            <p className="text-red-500">{errors.media?.[0].message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor="city">City <span className='text-red-500'>*</span></label>
          <input
            className='input'
            type='text'
            id="city"
            {...register("city", {
              required: "City is required",
            })}
            placeholder='City'
          />
          {errors.city && (
            <p className='text-red-500'>{errors.city.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor="country">Country</label>
          <input
            className='input'
            type='text'
            id="country"
            {...register("country",)}
            placeholder='Country'
          />
          {errors.country && (
            <p className='text-red-500'>{errors.country.message}</p>
          )}
        </div>

        <div className='mb-4'>
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

        <div className='mb-4'>
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

        <div className='mb-4'>
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

        <div className='mb-4 flex flex-row justify-around'>
          <label htmlFor="wifi">Wifi</label>
          <input
            className=''
            type='checkbox'
            id="wifi"
            {...register("wifi")}
          />
          {errors.wifi && (
            <p className='text-red-500'>{errors.wifi.message}</p>
          )}

          <label htmlFor="breakfast">Breakfast</label>
          <input
            className=''
            type='checkbox'
            id="breakfast"
            {...register("breakfast")}
          />
          {errors.breakfast && (
            <p className='text-red-500'>{errors.breakfast.message}</p>
          )}
        </div>

        <div className='mb-4 flex flex-row justify-around'>
          <label htmlFor="parking">Parking</label>
          <input
            className=''
            type='checkbox'
            id="parking"
            {...register("parking")}
          />
          {errors.parking && (
            <p className='text-red-500'>{errors.parking.message}</p>
          )}

          <label htmlFor="pets">Pets Allowed</label>
          <input
            className=''
            type='checkbox'
            id="pets"
            {...register("pets")}
          />
          {errors.pets && (
            <p className='text-red-500'>{errors.pets.message}</p>
          )}
        </div>

        <button
          type='submit'
          className='bg-black text-white text-xl p-2 w-full rounded-md font-semibold mb-2'
        >
          Create new Venue
        </button>
      </form>
    </>
  );
}
