import { useAuth } from "./useAuth";

export const useIsOwner = (userEmail: string | null): boolean => {
  const {user} = useAuth();

  return userEmail === user;
};