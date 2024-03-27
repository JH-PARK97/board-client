import React, { ReactNode } from 'react';
import { useModalStore } from '../../../store/modal';

// Sub Component - Title, Content, footer, button
interface ModalTitleProps {
    children?: ReactNode;
    hiddenCloseButton?: boolean;
    className?: string;
}

function ModalTitle({ children, hiddenCloseButton = false, className }: ModalTitleProps) {
    const { toggleModal } = useModalStore();
    return (
        <div className={`modal-title ${className}`}>
            <h2>{children}</h2>
            <span hidden={hiddenCloseButton} onClick={toggleModal} className="close">
                x
            </span>
        </div>
    );
}

interface ModalContentProps {
    children?: ReactNode;
    className?: string;
}

function ModalContent({ children, className }: ModalContentProps) {
    return <div className={`modal-body ${className}`}>{children}</div>;
}

interface ModalFooterProps {
    children?: ReactNode;
    className?: string;
}

function ModalFooter({ children, className }: ModalFooterProps) {
    return <div className={`modal-footer ${className}`}>{children}</div>;
}

interface ModalLabelButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
}

function ModalLabelButton({ children, onClick, className }: ModalLabelButtonProps) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

// Main Component - ModalMain

interface ModalProps {
    children?: ReactNode;
    removeDimmed?: boolean;
    className?: string;
}

function Modal({ children, removeDimmed = false, className }: ModalProps) {
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

export default Object.assign(Modal, {
    Title: ModalTitle,
    Content: ModalContent,
    Footer: ModalFooter,
    Button: ModalLabelButton,
});
