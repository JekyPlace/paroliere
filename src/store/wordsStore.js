import { create } from "zustand";
import parseCSV from "@/utils/parseCSV";
import wordsCSV from "@/data/words.csv?raw";
import getFirstAvailableLetter from "@/utils/getFirstAvailableLetter";
import wordSlug from "@/utils/wordSlug";

const initialWords = parseCSV(wordsCSV);

const useWordsStore = create((set, get) => ({
  allWords: initialWords,
  selectedLetter: getFirstAvailableLetter(initialWords),
  scrollTargetLetter: null,
  alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
  categories: [],
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
  setScrollTargetLetter: (letter) => set({ scrollTargetLetter: letter }),
  resetSelectedLetter: (words) =>
    set({ selectedLetter: getFirstAvailableLetter(words) }),
  clearActiveLetter: () => set({ selectedLetter: null }),
  findWordByItaliano: (italiano) => {
    if (!italiano) return null;
    const slug = wordSlug(decodeURIComponent(italiano));

    return get().allWords.find(
      (word) => wordSlug(word.Italiano) === slug,
    );
  },
  getCategories: () => {
    const words = get().allWords;
    return words.reduce((acc, word) => {
      if (!acc.includes(word.Categoria)) return [...acc, word.Categoria];
      return acc;
    }, []);
  },
}));

export default useWordsStore;
