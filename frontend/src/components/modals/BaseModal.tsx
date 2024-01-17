import { type ReactNode, useRef } from "react";
import useFocusTrap from "../../hooks/useFocusTrap";
import { useModal } from "../../context/ModalContext";
import styles from "./SampleModal.module.css";

interface BaseModalProps {
  children: ReactNode;
}

function BaseModal({ children }: BaseModalProps) {
  const { setModal } = useModal();
  const ref = useRef(null);
  useFocusTrap(ref, () => setModal(null));

  return (
    <div ref={ref} className={styles.modal}>
      {children}
    </div>
  );
}

export default BaseModal;
