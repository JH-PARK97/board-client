import { create } from 'zustand';

interface ModalStore {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    toggleModal: () => set(() => ({ isModalOpen: !get().isModalOpen })),
}));
