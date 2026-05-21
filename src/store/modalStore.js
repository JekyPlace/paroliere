import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  wordIdentifier: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
