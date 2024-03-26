import { create } from 'zustand';

interface ModalStore {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
}));
