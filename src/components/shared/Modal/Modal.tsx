import React from 'react';

interface ModalProps {
    title: string;
    onClose: () => void;
    onConfirm?: () => void;
    content?: React.ReactNode;
}

export default function Modal({ title, onClose, onConfirm, content }: ModalProps) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    {/* <span className="close" onClick={onClose}>
                        x
                    </span> */}
                </div>
                <div className="modal-body">{content}</div>
                <div className="modal-footer">
                    <button onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
}
