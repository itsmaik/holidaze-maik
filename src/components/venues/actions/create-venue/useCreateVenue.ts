import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createVenueService } from "@api/services/VenueServices";
import { useNavigate } from "react-router-dom";
import { TCreateVenueProps } from "src/types/venueFormTypes";

export default function useCreateVenue () {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {isPending: isCreating, mutate: createVenue} = useMutation({
    mutationFn: async (newVenue: TCreateVenueProps) => {
      const transformedVenue = {
        ...newVenue,
        media: newVenue.media?.map((url) => ({ url })) || [],
      };
      return createVenueService(transformedVenue);
    },
    onSuccess: () => {
      toast.success("Venue Created Successfully");
      queryClient.invalidateQueries({queryKey: ["venues"]});
      setTimeout(() => {
        navigate("/")
      }, 1000)
    },
    onError: (error) => {
      toast.error("Failed to create a venue, Please try again!");
      console.log(error);  
    }
  });

  return {isCreating, createVenue};
}