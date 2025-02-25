import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AnimatedText from "@components/navbar/AnimatedText";
import Button from "@components/globals/Button";

// Define the structure of the search form values
interface SearchFormValues {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: string;
}

export default function SearchBarForm(): JSX.Element {
  // Initialize form state
  const initialFormValues: SearchFormValues = {
    location: "",
    checkIn: null,
    checkOut: null,
    guests: "",
  };

  const [formValues, setFormValues] =
    useState<SearchFormValues>(initialFormValues);
  const navigate = useNavigate();

  // Update state on text input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Update check-in date
  const handleCheckInChange = (date: Date | null) => {
    setFormValues((prev) => ({ ...prev, checkIn: date }));
  };

  // Update check-out date
  const handleCheckOutChange = (date: Date | null) => {
    setFormValues((prev) => ({ ...prev, checkOut: date }));
  };

  // Handle form submission to build a query string and navigate to search results
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Convert date objects to strings (e.g., ISO format or dd/mm/yyyy)
    const checkInString = formValues.checkIn
      ? formValues.checkIn.toISOString().split("T")[0] // "YYYY-MM-DD"
      : "";
    const checkOutString = formValues.checkOut
      ? formValues.checkOut.toISOString().split("T")[0]
      : "";

    // Build the query parameters
    const queryParams: Record<string, string> = {};
    if (formValues.location) queryParams.location = formValues.location;
    if (checkInString) queryParams.checkIn = checkInString;
    if (checkOutString) queryParams.checkOut = checkOutString;
    if (formValues.guests) queryParams.guests = formValues.guests;

    const query = new URLSearchParams(queryParams).toString();

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
      <AnimatedText />

      <form
        onSubmit={handleSubmit}
        className='flex flex-wrap justify-center gap-4 w-full md:w-auto'
      >
        {/* LOCATION INPUT */}
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
            className='w-full bg-white px-4 py-2 focus:outline-none rounded-md text-black'
          />
        </div>

        <div className='flex flex-row w-full gap-2 md:w-auto md:gap-4'>
          {/* CHECK-IN DATEPICKER */}
          <div className='flex flex-col w-1/2 md:w-auto'>
            <label
              htmlFor='checkIn'
              className='text-sm sm:text-base hidden sm:block'
            >
              Check-In
            </label>
            <DatePicker
              id='checkIn'
              selected={formValues.checkIn}
              onChange={handleCheckInChange}
              minDate={new Date()}
              placeholderText='Select check-in date'
              className='w-full bg-white text-black px-4 py-2 focus:outline-none h-10 rounded-md'
              dateFormat='dd/MM/yyyy'
            />
          </div>

          {/* CHECK-OUT DATEPICKER */}
          <div className='flex flex-col w-1/2 md:w-auto'>
            <label
              htmlFor='checkOut'
              className='text-sm sm:text-base hidden sm:block'
            >
              Check-Out
            </label>
            <DatePicker
              id='checkOut'
              selected={formValues.checkOut}
              onChange={handleCheckOutChange}
              minDate={formValues.checkIn || new Date()}
              placeholderText='Select check-out date'
              className='w-full bg-white text-black px-4 py-2 focus:outline-none h-10 rounded-md'
              dateFormat='dd/MM/yyyy'
            />
          </div>
        </div>

        {/* GUESTS INPUT */}
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
            className='w-full bg-white px-4 py-2 focus:outline-none rounded-md text-black'
          />
        </div>

        {/* SUBMIT BUTTON */}
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
