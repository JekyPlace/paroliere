import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useModalRoute from "@/hooks/useModal";
import useWordsStore from "@/store/wordsStore";

export function useModalSxCol({ wordData }) {
  if (!wordData) {
    return {
      langs: [],
    };
  }

  const wordsKeyValue = Object.entries(wordData);
  const excluded = ["Descrizione breve", "Italiano", "Immagine", "Categoria"];
  const langs = wordsKeyValue.filter((k) => !excluded.includes(k[0]));

  return {
    langs,
  };
}

export function useModalDxCol() {
  const { closeModal } = useModalRoute();

  return {
    closeModal,
  };
}

export default function useModal() {
  const { isOpen, closeModal, modalRef } = useModalRoute();
  const { word } = useParams();
  const findWordByItaliano = useWordsStore((state) => state.findWordByItaliano);
  const wordData = findWordByItaliano(word);

  useEffect(() => {
    if (!isOpen) return;
    modalRef.current.focus();
  }, [isOpen, modalRef]);

  return {
    isOpen,
    closeModal,
    modalRef,
    wordData,
  };
}
