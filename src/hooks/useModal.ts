import { ModalContext } from "@context/ModalContext";
import { useContext } from "react";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }
  return context;
};