import { type MutableRefObject, useEffect } from "react";

const focusableElemString =
  "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

function useFocusTrap(
  ref: MutableRefObject<HTMLElement | null>,
  closeFn: () => void,
  disableScroll: boolean = false
) {
  useEffect(() => {
    // ref.current *should* always be set by now,
    // but to make TypeScript happy, we'll check.
    if (!ref.current) return;

    // Optionally, disable scrolling behind the modal
    if (disableScroll) {
      document.body.style.overflow = "hidden";
    }

    const node = ref.current;
    const focusableElements =
      node.querySelectorAll<HTMLElement>(focusableElemString);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // The wrapper <div> has a tabIndex of 0 so that it is focusable
    // this ensures that focus is directed to the modal at open
    node.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        } else if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      }

      if (e.key === "Escape") {
        closeFn();
      }
    };

    const handleMouseEvents = (e: MouseEvent) => {
      if (!node.contains(e.target as HTMLElement)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const options = { capture: true };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleMouseEvents, options);
    document.addEventListener("click", handleMouseEvents, options);

    return () => {
      if (disableScroll) {
        document.body.style.overflow = "unset";
      }

      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleMouseEvents, options);
      document.removeEventListener("click", handleMouseEvents, options);
    };
  }, [ref]);
}

export default useFocusTrap;
