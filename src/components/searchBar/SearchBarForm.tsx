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
      <div className="container flex flex-col w-full items-center">
        <div className="">
          <h1 className="font-bold text-4xl mb-2 text-white">Find your next destination</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-row">

          <div className="flex flex-col">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={formValues.location} onChange={handleChange} aria-label="Search location"
            placeholder="City, country, continent..."  className="w-full px-4 py-2 focus:outline-none rounded-s-md border-r"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="checkIn">Check-In</label>
            <input type="date" id="checkIn" name="checkIn" value={formValues.checkIn} onChange={handleChange} aria-label="Check-in date" className="w-full px-4 py-2 focus:outline-none h-10 border-r"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="checkOut">Check-Out</label>
            <input type="date" id="checkOut" name="checkOut" value={formValues.checkOut} onChange={handleChange} aria-label="Check-out date" className="w-full px-4 py-2 focus:outline-none h-10 border-r"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="guests">Guests</label>
            <input type="text" id="guests" name="guests" value={formValues.guests} onChange={handleChange} aria-label="Number of guests" className="w-full px-4 py-2 focus:outline-none rounded-e-md"/>
          </div>
          <div className="flex flex-col self-end ms-2">
            <Button type="submit" disabled={!isFormValid} className=""> Search</Button>
          </div>
        </form>
      </div>
    </>
  )
};