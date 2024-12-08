import { createContext, useState } from "react";

type TModalContext = {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TModalProvider = {
  children: React.ReactNode;
};

export const ModalContext = createContext<TModalContext | null>(null);

export default function ModalProvider({ children }: TModalProvider) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isLoginOpen, setLoginOpen, isRegisterOpen, setRegisterOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
