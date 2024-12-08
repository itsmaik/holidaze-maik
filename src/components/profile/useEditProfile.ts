import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserProfile } from "@api/services/AuthServices";

export default function useEditProfile() {
  const queryClient = useQueryClient();

  const { mutate: editProfile, isLoading } = useMutation({
    mutationFn: ({ email, avatar }: { email: string; avatar: { url: string; alt: string } }) =>
      updateUserProfile(email, { avatar }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile. Please try again.");
    },
  });

  return { editProfile, isLoading };
}
