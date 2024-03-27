import React from 'react';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProtalProps {
    children: ReactNode;
}

export default function ModalPortal({ children }: ModalProtalProps) {
    const modalRoot = document.getElementById('modal-root') as HTMLElement;

    return createPortal(
        <>
            <div className="dim"> </div>
            <div className="modal">
                <div className="modal-content">{children}</div>
            </div>
        </>,
        modalRoot
    );
}
