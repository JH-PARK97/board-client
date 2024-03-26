import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProtalProps {
    children: ReactNode;
}

export default function ModalPortal({ children }: ModalProtalProps) {
    const modalRoot = document.getElementById('modal-root') as HTMLElement;

    return createPortal(children, modalRoot);
}
