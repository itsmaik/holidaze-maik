import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteVenueService } from "@api/services/VenueServices";

export default function useDeleteVenue () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: deleteVenue} = useMutation({
    mutationFn: deleteVenueService,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["venues"]})
      toast.success("Venue deleted successfully")
      setTimeout(() => {
        navigate("/")
      }, 1000)
    },
    onError: () => {
      toast.error("Failed to delete venue. Please try again.");
    },
  });

  return {deleteVenue};
};