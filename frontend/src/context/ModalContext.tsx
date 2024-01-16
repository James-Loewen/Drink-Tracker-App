import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

export type ModalName = "sampleModal";

export interface ModalContextType {
  modal: ModalName | null;
  setModal: Dispatch<SetStateAction<ModalName | null>>;
}

const ModalContext = createContext<ModalContextType>(null!);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalName | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
