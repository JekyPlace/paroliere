import { useEffect, useRef } from "react";
import useCategoryFilter from "@/hooks/useCategoryFilter";

export default function useHeader() {
  const { selectedCategory, resetCategory } = useCategoryFilter();
  const activeFilter =
    selectedCategory === "all" ? "Tutte le parole" : selectedCategory;
  const ref = useRef(null);
  const isStickyRef = useRef(false);

  useEffect(() => {
    const stickAt = 140;
    const unstickAt = 90;

    const handleScroll = () => {
      if (!ref.current) return;

      const shouldStick = !isStickyRef.current && window.scrollY >= stickAt;
      const shouldUnstick = isStickyRef.current && window.scrollY <= unstickAt;

      if (shouldStick) {
        ref.current.classList.add("sticky");
        isStickyRef.current = true;
      }

      if (shouldUnstick) {
        ref.current.classList.remove("sticky");
        isStickyRef.current = false;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    activeFilter,
    selectedCategory,
    resetCategory,
    ref,
  };
}
