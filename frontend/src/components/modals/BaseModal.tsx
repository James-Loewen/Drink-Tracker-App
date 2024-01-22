import { type ReactNode, useRef } from "react";
import useFocusTrap from "../../hooks/useFocusTrap";
import { useModal } from "../../context/ModalContext";
import styles from "./SampleModal.module.css";

interface BaseModalProps {
  children: ReactNode;
}

function BaseModal({ children }: BaseModalProps) {
  const { closeModal } = useModal();
  const ref = useRef(null);
  useFocusTrap(ref, closeModal, true);

  return (
    <div ref={ref} className={styles.modal} tabIndex={0}>
      {children}
    </div>
  );
}

export default BaseModal;
