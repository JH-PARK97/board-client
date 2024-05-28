import React from 'react';
import IconButton from '@mui/material/IconButton/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import Modal from './modal/Modal';
import useModal from '../hooks/useModal';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function CreatePostButton() {
    const navigate = useNavigate();
    const { isLogin } = useAuthStore();
    const { closeModal, isModalOpen, openModal } = useModal();

    const handleCreatePostButton = () => {
        if (!isLogin) {
            openModal();
        } else {
            navigate('/post/create');
        }
    };
    return (
        <>
            <IconButton onClick={handleCreatePostButton}>
                <CreateIcon />
            </IconButton>
            <Modal
                removeDimmed={true}
                content="로그인 후 이용해 주세요!"
                title="알림"
                confirm="확인"
                onConfirm={closeModal}
                onCancel={closeModal}
                isOpen={isModalOpen}
            />
        </>
    );
}
