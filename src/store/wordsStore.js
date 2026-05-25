import { create } from "zustand";
import parseCSV from "@/utils/parseCSV";
import wordsCSV from "@/data/words.csv?raw";

const initialWords = parseCSV(wordsCSV);

const useWordsStore = create((set, get) => ({
  allWords: initialWords,
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
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  resetCategory: () => set({ selectedCategory: "all", words: get().allWords }),
  findWordByItaliano: (italiano) => {
    const words = get().words;
    if (!italiano) return null;
    return words.find(
      (word) => word.Italiano.toLowerCase() === italiano.toLowerCase(),
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
