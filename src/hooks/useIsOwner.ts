import { useState, useEffect } from "react";

const storedProfileEmail = localStorage.getItem("user");

export const useIsOwner = (userEmail: string | null): boolean => {
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    const correctedLocalStorageEmail = storedProfileEmail?.replace(/"/g, "");
    return userEmail === correctedLocalStorageEmail;
  });
  useEffect(() => {
    const correctedLocalStorageEmail = storedProfileEmail?.replace(/"/g, "");
    setIsOwner(userEmail === correctedLocalStorageEmail);
  }, [userEmail]);
  return isOwner;
};
