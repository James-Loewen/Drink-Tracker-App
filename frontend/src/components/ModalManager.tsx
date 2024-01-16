import { useModal } from "../context/ModalContext";
import SampleModal from "./SampleModal";
import ModalPortal from "./ModalPortal";

function ModalManager() {
  const { modal } = useModal();

  const modalsMap = {
    sampleModal: <SampleModal />,
  };

  if (!modal) return null;

  return <ModalPortal>{modalsMap[modal]}</ModalPortal>;
}

export default ModalManager;
