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
  lastActiveElement: any;
  setLastActiveElement: Dispatch<any>;
  closeModal: () => void;
  openModal: (modalComponent: Modal) => void;
}

const ModalContext = createContext<ModalContextType>(null!);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<Modal | null>(null);
  const [lastActiveElement, setLastActiveElement] = useState<any>("");

  function closeModal() {
    setModal(null);
    setLastActiveElement(null);
    lastActiveElement.focus();
  }

  function openModal(modalComponent: Modal) {
    if (modal === null) {
      setLastActiveElement(document.activeElement);
    }
    setModal(modalComponent);
  }

  const value = {
    modal,
    setModal,
    closeModal,
    openModal,
    lastActiveElement,
    setLastActiveElement,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
