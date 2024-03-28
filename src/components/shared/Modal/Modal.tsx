import React, { ReactNode } from 'react';
import { useModalStore } from '../../../store/modal';

// Main Component - Modal

interface ModalProps {
    children?: ReactNode;
    removeDimmed?: boolean;
    className?: string;
}

export default function Modal({ children, removeDimmed = false, className }: ModalProps) {
    const { isModalOpen } = useModalStore();
    if (!isModalOpen) {
        return null;
    }

    return (
        <>
            <div hidden={removeDimmed} className="dim"></div>
            <div className="modal z-10">
                <div className={`modal-content ${className ? className : ''}`}>{children}</div>
            </div>
        </>
    );
}

// Sub Component - Title, Content, Footer, Button
interface ModalTitleProps {
    children?: ReactNode;
    hiddenCloseButton?: boolean;
    className?: string;
}

Modal.Title = function Title({ children, hiddenCloseButton = false, className }: ModalTitleProps) {
    const { toggleModal } = useModalStore();
    return (
        <div className={`modal-title ${className ? className : ''}`}>
            <h2>{children}</h2>
            <span hidden={hiddenCloseButton} onClick={toggleModal} className="close">
                x
            </span>
        </div>
    );
};

interface ModalContentProps {
    children?: ReactNode;
    className?: string;
}

Modal.Content = function Content({ children, className }: ModalContentProps) {
    return <div className={`modal-body ${className ? className : ''}`}>{children}</div>;
};

interface ModalFooterProps {
    children?: ReactNode;
    className?: string;
}

Modal.Footer = function Footer({ children, className }: ModalFooterProps) {
    return <div className={`modal-footer ${className ? className : ''}`}>{children}</div>;
};

interface ModalButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
}

Modal.Button = function Button({ children, onClick, className }: ModalButtonProps) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};
