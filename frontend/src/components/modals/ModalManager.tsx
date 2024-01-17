import { useModal } from "../../context/ModalContext";
import ModalPortal from "./ModalPortal";

function ModalManager() {
  const { modal } = useModal();

  if (!modal) return null;

  return <ModalPortal>{modal}</ModalPortal>;
}

export default ModalManager;
