import React, { ReactNode, useRef } from 'react';
import { useModalStore } from '../../../store/modal';

// Main Component - Modal

interface ModalProps {
    hiddenCloseButton?: boolean;
    removeDimmed?: boolean;
    className?: string;
    title: string;
    content: ReactNode;
    confirm?: string;
    cancel?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

export default function Modal({
    removeDimmed = false,
    className,
    confirm = '확인',
    content,
    title,
    cancel,
    hiddenCloseButton,
    onConfirm,
    onCancel,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, closeModal } = useModalStore();
    if (!isModalOpen) {
        return null;
    }

    const handleModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current === e.target) {
            closeModal();
        }
    };

    return (
        <>
            <div hidden={removeDimmed} className="dim"></div>
            <div className="modal z-10" ref={modalRef} onClick={handleModalOutsideClick}>
                <div className={`modal-content ${className ? className : ''}`}>
                    <Modal.Title title={title} hiddenCloseButton={hiddenCloseButton} />
                    <Modal.Content content={content} />
                    <Modal.Footer>
                        <Modal.Button onConfirm={onConfirm} onCancel={onCancel} confirm={confirm} cancel={cancel} />
                    </Modal.Footer>
                </div>
            </div>
        </>
    );
}

// Sub Component - Title, Content, Footer, Button
interface ModalTitleProps {
    title: string;
    hiddenCloseButton?: boolean;
    className?: string;
}

Modal.Title = function Title({ title, hiddenCloseButton = false, className }: ModalTitleProps) {
    const { toggleModal } = useModalStore();
    return (
        <div className={`modal-title ${className ? className : ''}`}>
            <h2>{title}</h2>
            <span hidden={hiddenCloseButton} onClick={toggleModal} className="close">
                x
            </span>
        </div>
    );
};

interface ModalContentProps {
    content: ReactNode;
    className?: string;
}

Modal.Content = function Content({ content, className }: ModalContentProps) {
    return <div className={`modal-body ${className ? className : ''}`}>{content}</div>;
};

interface ModalFooterProps {
    children?: ReactNode;
    className?: string;
}

Modal.Footer = function Footer({ children, className }: ModalFooterProps) {
    return <div className={`modal-footer ${className ? className : ''}`}>{children}</div>;
};

interface ModalButtonProps {
    confirm?: ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    className?: string;
    cancel?: string;
}

Modal.Button = function Button({ confirm, onConfirm, onCancel, className, cancel }: ModalButtonProps) {
    return (
        <>
            <button className={`${className} mr-3`} onClick={onConfirm}>
                {confirm}
            </button>

            <button hidden={!cancel} className={className} onClick={onCancel}>
                {cancel}
            </button>
        </>
    );
};
