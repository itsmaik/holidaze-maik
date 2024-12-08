import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editVenueService } from "@api/services/VenueServices";
import { useNavigate } from "react-router-dom";
import type { TEditVenueProps } from "src/types/editVenueTypes";

export default function useEditVenue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editVenue, isLoading: isEditing } = useMutation({
    mutationFn: async (updatedVenue: TEditVenueProps) => {
      const transformedVenue = {
        ...updatedVenue,
        media: updatedVenue.media?.map((url) => ({ url })) || [],
      };
      return editVenueService(updatedVenue.id, transformedVenue);
    },
    onSuccess: () => {
      toast.success("Venue updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      toast.error("Failed to update the venue. Please try again!");
      console.error(error);
    },
  });

  return { editVenue, isEditing };
}
