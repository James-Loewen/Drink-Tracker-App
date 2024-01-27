import { type ReactNode, useRef } from "react";
import useFocusTrap from "../../hooks/useFocusTrap";
import { useModal } from "../../context/ModalContext";
import styles from "./BaseModal.module.css";

import xIcon from "../../assets/x.svg";

interface BaseModalProps {
  children: ReactNode;
  focusTrapTriggers?: any[]; // <-- State vars that should trigger a reload
}

function BaseModal({ children, focusTrapTriggers = [] }: BaseModalProps) {
  const { closeModal } = useModal();
  const ref = useRef(null);
  useFocusTrap(ref, closeModal, true, focusTrapTriggers);

  return (
    <div ref={ref} className={styles.modal} tabIndex={0}>
      <button
        className="absolute top-1 right-1 p-1 rounded-[50%] hover:bg-slate-300/70 transition-colors"
        onClick={closeModal}
      >
        <img width={24} height={24} src={xIcon} alt="Close Icon" />
        <span className="sr-only">Exit Modal</span>
      </button>
      {children}
    </div>
  );
}

export default BaseModal;
