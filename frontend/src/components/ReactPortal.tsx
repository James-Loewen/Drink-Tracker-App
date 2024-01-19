import { useLayoutEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

function createWrapperAndAppendToBody(wrapperId: string, classes: string = "") {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  wrapperElement.setAttribute("class", classes);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

interface ReactPortalType {
  children: ReactNode;
  wrapperId: string;
  className?: string;
}

function ReactPortal({ children, wrapperId, className }: ReactPortalType) {
  const [wrapperElement, setWrapperElement] = useState<Element | null>(null);

  useLayoutEffect(() => {
    let element = document.querySelector(`#${wrapperId}`);
    let nodeCreated = false;

    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId, className);
      nodeCreated = true;
    }
    setWrapperElement(element);

    return () => {
      if (nodeCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
