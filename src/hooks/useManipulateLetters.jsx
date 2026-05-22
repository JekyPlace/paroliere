import useWordsStore from "@/store/wordsStore";

export default function useManipulateLetters() {
  const selectedLetter = useWordsStore((state) => state.selectedLetter);
  const setSelectedLetter = useWordsStore((state) => state.setSelectedLetter);
  const setScrollTargetLetter = useWordsStore(
    (state) => state.setScrollTargetLetter,
  );

  const changeSelectedLetter = (letterClicked, event, wordRef) => {
    if (letterClicked === selectedLetter) return;

    if (letterClicked === selectedLetter) {
      event.stopPropagation();
      return;
    }

    if (event.currentTarget.classList.contains("disabled")) {
      event.stopPropagation();
      return;
    }

    wordRef.current = event.currentTarget;
    setSelectedLetter(letterClicked);
    setScrollTargetLetter(letterClicked);
  };

  return {
    changeSelectedLetter,
  };
}
