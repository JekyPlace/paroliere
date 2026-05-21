import { create } from "zustand";
import parseCSV from "@/utils/parseCSV";
import wordsCSV from "@/data/words.csv?raw";

const initialWords = parseCSV(wordsCSV);

const useWordsStore = create((set, get) => ({
  words: initialWords,
  setWords: (newWords) => set({ words: newWords }),
  getWords: () => get().words,
}));

export default useWordsStore;
