import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import useModal from "@/hooks/useModal";
import useWordsStore from "@/store/wordsStore";
import getFirstLetters from "@/utils/getFirstLetters";
import wordSlug from "@/utils/wordSlug";

export default function useMainContent({ words }) {
  const scrollTargetLetter = useWordsStore((state) => state.scrollTargetLetter);
  const location = useLocation();

  const wordsOrdered = useMemo(() => {
    const wordsOrdered = [...words].sort((a, b) =>
      a.Italiano.localeCompare(b.Italiano),
    );

    const wordsNotDuplicated = wordsOrdered.reduce((acc, word) => {
      if (!acc.some((w) => w.Italiano === word.Italiano)) {
        acc.push(word);
      }
      return acc;
    }, []);

    return wordsNotDuplicated;
  }, [words]);

  const wordsFirstLetters = useMemo(() => {
    return getFirstLetters(wordsOrdered, "Italiano");
  }, [wordsOrdered]);

  const { openModal } = useModal();
  const wordRef = useRef(null);
  const isAutoScrolling = useRef(false);
  const autoScrollTimeout = useRef(null);

  const scrollToTargetLetter = useCallback((targetLetter) => {
    if (!targetLetter) return;

    if (wordRef.current) {
      const header = document.querySelector(".header");
      const headerOffset = header?.getBoundingClientRect().height ?? 0;
      const scrollOffset = headerOffset + 24;
      const targetTop =
        wordRef.current.getBoundingClientRect().top + window.scrollY;

      isAutoScrolling.current = true;
      window.scrollTo({
        top: Math.max(targetTop - scrollOffset, 0),
        behavior: "smooth",
      });

      window.clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = window.setTimeout(() => {
        isAutoScrolling.current = false;
        useWordsStore.setState({ selectedLetter: targetLetter });
      }, 700);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isAutoScrolling.current) return;

    const wordWrappers = document.querySelectorAll(".word-wrapper");
    const activationOffset = window.innerHeight * 0.35;
    let activeLetter = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    wordWrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const letter = wrapper.getAttribute("data-letter");
      const isInViewport = rect.top <= activationOffset && rect.bottom >= 0;

      if (!isInViewport) return;

      const distance = Math.abs(rect.top - activationOffset);

      if (distance < closestDistance) {
        activeLetter = letter;
        closestDistance = distance;
      }
    });

    const currentSelectedLetter = useWordsStore.getState().selectedLetter;

    if (activeLetter && activeLetter !== currentSelectedLetter) {
      useWordsStore.setState({ selectedLetter: activeLetter });
    }
  }, []);

  const openWordModal = useCallback(
    (word) => {
      openModal({
        pathname: `/word/${wordSlug(word.Italiano)}`,
        search: location.search,
      });
    },
    [location.search, openModal],
  );

  useEffect(() => {
    scrollToTargetLetter(scrollTargetLetter);
  }, [scrollTargetLetter, scrollToTargetLetter]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(autoScrollTimeout.current);
    };
  }, [handleScroll]);

  return {
    scrollTargetLetter,
    wordsOrdered,
    wordsFirstLetters,
    wordRef,
    openWordModal,
  };
}
