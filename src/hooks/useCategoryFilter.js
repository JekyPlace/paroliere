import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useWordsStore from "@/store/wordsStore";

const CATEGORY_PARAM = "category";
const ALL_CATEGORIES = "all";

export default function useCategoryFilter({ syncSelectedLetter = false } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const allWords = useWordsStore((state) => state.allWords);
  const resetSelectedLetter = useWordsStore((state) => state.resetSelectedLetter);
  const selectedCategory = searchParams.get(CATEGORY_PARAM) ?? ALL_CATEGORIES;

  const words = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) return allWords;

    return allWords.filter((word) => word.Categoria === selectedCategory);
  }, [allWords, selectedCategory]);

  const selectCategory = (category) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (!category || category === ALL_CATEGORIES) {
        nextParams.delete(CATEGORY_PARAM);
      } else {
        nextParams.set(CATEGORY_PARAM, category);
      }

      return nextParams;
    });
  };

  const resetCategory = () => {
    selectCategory(ALL_CATEGORIES);
  };

  useEffect(() => {
    if (!syncSelectedLetter) return;

    resetSelectedLetter(words);
  }, [resetSelectedLetter, syncSelectedLetter, words]);

  return {
    words,
    selectedCategory,
    selectCategory,
    resetCategory,
  };
}
