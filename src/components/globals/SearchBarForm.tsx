import { useState, ChangeEvent, FormEvent, JSX } from "react";
import Button from "@components/globals/Button";
import { useNavigate } from "react-router-dom";
import AnimatedText from "@components/navbar/AnimatedText";

// Define the structure of the search form values
interface SearchFormValues {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export default function SearchBarForm(): JSX.Element {
  // Initialize form state
  const initialFormValues: SearchFormValues = {
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  };

  const [formValues, setFormValues] =
    useState<SearchFormValues>(initialFormValues);
  const navigate = useNavigate();

  // Update state on input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to build a query string and navigate to search results
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams(
      Object.entries(formValues).reduce((acc, [key, value]) => {
        if (value) acc[key] = value.toString();
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    if (query) {
      navigate(`/search-results?${query}`);
    }
    // Reset form state after submission
    setFormValues(initialFormValues);
  };

  // Basic validation: ensure location is provided before enabling submission
  const isFormValid = formValues.location.trim().length > 0;

  return (
    <div className='container flex flex-col w-full items-center text-white'>
      {/* Animated header text (visible on medium screens and up) */}
      <div className='text-center mb-4 hidden md:block'>
        <AnimatedText />
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex flex-wrap justify-center gap-4 w-full md:w-auto'
      >
        <div className='flex flex-col w-full md:w-auto'>
          <label
            htmlFor='location'
            className='text-sm sm:text-base hidden sm:block'
          >
            Location
          </label>
          <input
            type='text'
            id='location'
            name='location'
            value={formValues.location}
            onChange={handleChange}
            aria-label='Search location'
            placeholder='City, country, continent...'
            className='w-full px-4 py-2 bg-white focus:outline-none rounded-md text-black'
          />
        </div>

        <div className='flex flex-row w-full gap-2 md:w-auto md:gap-4'>
          <div className='flex flex-col w-1/2'>
            <label
              htmlFor='checkIn'
              className='text-sm sm:text-base hidden sm:block'
            >
              Check-In
            </label>
            <input
              type='date'
              id='checkIn'
              name='checkIn'
              value={formValues.checkIn}
              onChange={handleChange}
              aria-label='Check-in date'
              className='w-full px-4 py-2 bg-white focus:outline-none rounded-md text-black'
            />
          </div>
          <div className='flex flex-col w-1/2'>
            <label
              htmlFor='checkOut'
              className='text-sm sm:text-base hidden sm:block'
            >
              Check-Out
            </label>
            <input
              type='date'
              id='checkOut'
              name='checkOut'
              value={formValues.checkOut}
              onChange={handleChange}
              aria-label='Check-out date'
              className='w-full px-4 py-2 bg-white focus:outline-none rounded-md text-black'
            />
          </div>
        </div>

        <div className='flex flex-col w-full md:w-auto'>
          <label
            htmlFor='guests'
            className='text-sm sm:text-base hidden sm:block'
          >
            Guests
          </label>
          <input
            type='text'
            id='guests'
            name='guests'
            value={formValues.guests}
            onChange={handleChange}
            aria-label='Number of guests'
            placeholder='Number of guests'
            className='w-full px-4 py-2 bg-white focus:outline-none rounded-md text-black'
          />
        </div>

        <div className='flex flex-col w-full md:w-auto self-center md:self-end'>
          <Button
            type='submit'
            disabled={!isFormValid}
            className='w-full md:w-auto px-6 py-2'
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
