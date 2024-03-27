import React from 'react';

interface ModalProps {
    title: string;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    content?: React.ReactNode;
    hideConfirm?: boolean;
    hideCancel?: boolean;
}

export default function Modal({
    title,
    onClose,
    onConfirm,
    onCancel,
    content,
    hideCancel = false,
    hideConfirm = false,
}: ModalProps) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <span className="close" onClick={onClose}>
                        x
                    </span>
                </div>
                <div className="modal-body">{content}</div>
                <div className="modal-footer flex">
                    <button disabled={hideConfirm} onClick={onConfirm}>
                        확인
                    </button>
                    <button disabled={hideCancel} onClick={onCancel}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}
