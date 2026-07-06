import { useEffect, useRef } from "react";
import useManipulateLetters from "@/hooks/useManipulateLetters";
import useWordsStore from "@/store/wordsStore";
import getFirstLetters from "@/utils/getFirstLetters";

export function useAlphabetWithStyle() {
  const selectedLetter = useWordsStore((state) => state.selectedLetter);
  const wordRef = useRef(null);
  const { changeSelectedLetter } = useManipulateLetters();

  return {
    selectedLetter,
    wordRef,
    changeSelectedLetter,
  };
}

export default function useSidebar({ words }) {
  const alphabet = useWordsStore((state) => state.alphabet);
  const selectedLetter = useWordsStore((state) => state.selectedLetter);
  const sidebarRef = useRef(null);
  const firstLetters = getFirstLetters(words, "Italiano");

  useEffect(() => {
    if (!selectedLetter || !sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    const selectedItem = sidebar.querySelector(
      `[data-letter="${selectedLetter}"]`,
    );

    if (!selectedItem) return;

    const nextScrollTop =
      selectedItem.offsetTop -
      sidebar.clientHeight / 2 +
      selectedItem.clientHeight / 2;

    sidebar.scrollTo({
      top: nextScrollTop,
      behavior: "smooth",
    });
  }, [selectedLetter]);

  return {
    alphabet,
    sidebarRef,
    firstLetters,
  };
}
