import { create } from "zustand";
import parseCSV from "@/utils/parseCSV";
import wordsCSV from "@/data/words.csv?raw";

const initialWords = parseCSV(wordsCSV);

const useWordsStore = create((set, get) => ({
  words: initialWords,
  activeLetter: "a",
  alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
  setWords: (newWords) => set({ words: newWords }),
  getWords: () => get().words,
  setActiveLetter: (letter) => set({ activeLetter: letter }),
  clearActiveLetter: () => set({ activeLetter: null }),
}));

export default useWordsStore;
