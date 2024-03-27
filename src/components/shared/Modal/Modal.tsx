import React, { ReactNode } from 'react';
import { useModalStore } from '../../../store/modal';

// Sub Component - Title, Content, footer, button
interface ModalTitleProps {
    children?: ReactNode;
}

function ModalTitle({ children }: ModalTitleProps) {
    return (
        <div className="modal-title">
            <h2>{children}</h2>
            <span className="close">x</span>
        </div>
    );
}

interface ModalContentProps {
    children?: ReactNode;
}

function ModalContent({ children }: ModalContentProps) {
    return <div className="modal-body">{children}</div>;
}

interface ModalLabelButtonProps {
    children?: ReactNode;
    onClick?: () => void;
}

function ModalLabelButton({ children, onClick }: ModalLabelButtonProps) {
    return (
        <div className="modal-footer flex">
            <button onClick={onClick}>{children}</button>
        </div>
    );
}

// Main Component - ModalMain

interface ModalProps {
    children?: ReactNode;
}

function Modal({ children }: ModalProps) {
    const { isModalOpen } = useModalStore();
    if (!isModalOpen) {
        return null;
    }

    return <>{children}</>;
}

export default Object.assign(Modal, {
    Title: ModalTitle,
    Content: ModalContent,
    Footer: ModalLabelButton,
});
