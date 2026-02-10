import { useEffect, RefObject } from "react";

// Hook to detect clicks outside of specified elements like modals
export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node),
      );

      if (clickedOutside) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [refs, handler, enabled]);
}
