import React, { ReactNode, useEffect, useRef } from 'react';
import ModalPortal from './MordalPortal';

interface ModalProps {
    isOpen: boolean;
    removeDimmed?: boolean;
    className?: string;
    title: string;
    content: ReactNode;
    confirm?: string;
    cancel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function Modal({
    isOpen = false,
    removeDimmed = false,
    confirm = '확인',
    content,
    title,
    cancel,
    onConfirm,
    onCancel,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };

        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;

            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const handleModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && modalRef.current === e.target) {
            onCancel();
        }
    };

    return (
        <>
            <ModalPortal>
                <div hidden={removeDimmed} className="dim"></div>
                <div className="modal z-10" ref={modalRef} onClick={handleModalOutsideClick}>
                    <div className="modal-content">
                        <div className="modal-title">
                            <h2>{title}</h2>
                        </div>
                        <div className="modal-body">{content}</div>
                        <div className="modal-footer">
                            <Modal.Button onConfirm={onConfirm} onCancel={onCancel} confirm={confirm} cancel={cancel} />
                        </div>
                    </div>
                </div>
            </ModalPortal>
        </>
    );
}

interface ModalButtonProps {
    confirm?: ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    cancel?: string;
}
Modal.Button = function Button({ confirm, onConfirm, onCancel, cancel }: ModalButtonProps) {
    return (
        <>
            <button className="modal-action mr-3" onClick={onConfirm}>
                {confirm}
            </button>
            {cancel && (
                <button className="modal-action" onClick={onCancel}>
                    {cancel}
                </button>
            )}
        </>
    );
};
