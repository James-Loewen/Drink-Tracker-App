import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

export type Modal = ReactNode;

export interface ModalContextType {
  modal: Modal | null;
  setModal: Dispatch<SetStateAction<Modal | null>>;
}

const ModalContext = createContext<ModalContextType>(null!);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<Modal | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
