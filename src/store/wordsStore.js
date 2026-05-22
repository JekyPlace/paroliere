import { create } from "zustand";
import parseCSV from "@/utils/parseCSV";
import wordsCSV from "@/data/words.csv?raw";

const initialWords = parseCSV(wordsCSV);

const useWordsStore = create((set, get) => ({
  words: initialWords,
  selectedLetter: "a",
  alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
  setWords: (newWords) => set({ words: newWords }),
  getWords: () => get().words,
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
  clearActiveLetter: () => set({ selectedLetter: null }),
}));

export default useWordsStore;
