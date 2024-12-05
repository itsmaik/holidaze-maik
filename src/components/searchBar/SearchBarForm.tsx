import { useState } from "react"
import Button from "@components/globals/Button"
import { useNavigate } from "react-router-dom";


export default function SearchBarForm () {
  const initialFormValues = {
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams(
      Object.entries(formValues).reduce((acc, [key, value]) => {
        if (value) acc[key] = value.toString(); // Add only non-empty values
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    navigate(`/search-results?${query}`);
    setFormValues(initialFormValues);
  }

  const isFormValid = formValues.location.trim().length > 0;

  return(
    <>
      <div className="container flex flex-col w-full items-center text-white">
        <div className="text-center mb-4 hidden md:block">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Find your next destination</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-4 w-full md:w-auto">

          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="location" className="text-sm sm:text-base hidden sm:block">Location</label>
            <input type="text" id="location" name="location" value={formValues.location} onChange={handleChange} aria-label="Search location"
            placeholder="City, country, continent..."  className="w-full px-4 py-2 focus:outline-none rounded-md"/>
          </div>

          <div className="flex flex-row w-full gap-2 md:w-auto md:gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="checkIn" className="text-sm sm:text-base hidden sm:block">Check-In</label>
              <input type="date" id="checkIn" name="checkIn" value={formValues.checkIn} onChange={handleChange} aria-label="Check-in date" className="w-full px-4 py-2 focus:outline-none h-10 rounded-md"/>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="checkOut" className="text-sm sm:text-base hidden sm:block">Check-Out</label>
              <input type="date" id="checkOut" name="checkOut" value={formValues.checkOut} onChange={handleChange} aria-label="Check-out date" className="w-full px-4 py-2 focus:outline-none h-10 rounded-md"/>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="guests" className="text-sm sm:text-base hidden sm:block">Guests</label>
            <input type="text" id="guests" name="guests" value={formValues.guests} onChange={handleChange} aria-label="Number of guests" className="w-full px-4 py-2 focus:outline-none rounded-md"/>
          </div>
          <div className="flex flex-col w-full md:w-auto self-center md:self-end">
            <Button type="submit" disabled={!isFormValid} className="w-full md:w-auto px-6 py-2 bg-blue-600 bg-opacity-15 text-white rounded-md hover:bg-blue-400"> Search</Button>
          </div>
        </form>
      </div>
    </>
  )
};