import { type MutableRefObject, useEffect } from "react";

const focusableElemString =
  "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

const useFocusTrap = (
  ref: MutableRefObject<HTMLElement | null>,
  closeFn: () => void
) => {
  const lastActiveElement = document.activeElement as HTMLElement;

  useEffect(() => {
    // ref.current *should* always be set by now,
    // but to make TypeScript happy, we'll check.
    if (!ref.current) return;

    const node = ref.current;
    const focusableElements =
      node.querySelectorAll<HTMLElement>(focusableElemString);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // If this evaluates to false it (most likely) means that
    // a descendent of the Focus Trap node has an autofocus
    // attribute, which should be respected.
    if (document.activeElement === lastActiveElement) {
      firstElement.focus();
    }

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
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleMouseEvents, options);
      document.removeEventListener("click", handleMouseEvents, options);

      // return focus to lastActiveElement
      lastActiveElement.focus();
    };
  }, [ref]);
};

export default useFocusTrap;