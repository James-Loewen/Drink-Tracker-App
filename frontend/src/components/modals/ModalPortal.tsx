import type { ReactNode } from "react";

import ReactPortal from "../ReactPortal";
import clsx from "clsx";

interface ModalPortalProps {
  children: ReactNode;
}

function ModalPortal({ children }: ModalPortalProps) {
  const classes = clsx(
    "fixed top-0 left-0",
    "w-screen h-screen",
    "flex justify-center items-center",
    "bg-neutral-800/50"
  );

  return (
    <ReactPortal wrapperId="modal-root" className={classes}>
      {children}
    </ReactPortal>
  );
}

export default ModalPortal;
