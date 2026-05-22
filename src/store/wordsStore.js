import { create } from "zustand";
import parseCSV from "@/utils/parseCSV";
import wordsCSV from "@/data/words.csv?raw";

const initialWords = parseCSV(wordsCSV);

const useWordsStore = create((set, get) => ({
  words: initialWords,
  selectedLetter: "a",
  scrollTargetLetter: null,
  alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
  categories: [],
  selectedCategory: "all",
  setWords: (newWords) => set({ words: newWords }),
  getWords: () => get().words,
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
  setScrollTargetLetter: (letter) => set({ scrollTargetLetter: letter }),
  clearActiveLetter: () => set({ selectedLetter: null }),
  findWordByItaliano: (italiano) => {
    const words = get().words;
    if (!italiano) return null;
    return words.find(
      (word) => word.Italiano.toLowerCase() === italiano.toLowerCase(),
    );
  },
}));

export default useWordsStore;
