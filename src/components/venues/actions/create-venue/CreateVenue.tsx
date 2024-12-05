import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVenueService } from "@api/services/VenueServices";
import CreateVenueForm from "./CreateVenueForm";
import toast from "react-hot-toast";
import { TCreateVenueFormInput } from "src/types/venueFormTypes";


export default function CreateVenue() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleCreateVenue = async (newVenue: TCreateVenueFormInput) => {
    try {
      const response = await createVenueService({ newVenue });
      if (response) {
        toast.success("Venue Created Successfully");
        navigate("/");
        console.log(newVenue);
      };
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors[0].message);
      } else if (err instanceof Error) {
        setError("Registration failed. Please try again!");
      }
    }
  };

  return (
    <div>
      <CreateVenueForm onSubmit={handleCreateVenue} apiError={error} />
    </div>
  );
}
