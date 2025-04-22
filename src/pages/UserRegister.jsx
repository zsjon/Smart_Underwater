import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Modal,
    Backdrop,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './UserRegister.module.css';

const UserRegister = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [agree, setAgree] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!agree) {
            setModalMessage('약관에 동의해주세요.');
            setOpenModal(true);
            return;
        }
        if (!name || !phone) {
            setModalMessage('모든 정보를 입력해 주세요.');
            setOpenModal(true);
            return;
        }
        setModalMessage('등록해주셔서 감사합니다.\n계정 정보가 전달되었습니다.');
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        if (modalMessage.includes('등록해주셔서 감사합니다')) {
            navigate('/');
        }
    };

    return (
        <Box className={styles.wrapper}>
            <Typography variant="h5" gutterBottom>사용자 정보 등록</Typography>
            <TextField
                fullWidth
                label="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="휴대전화번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2 }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                }
                label="약관에 동의합니다"
            />

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                입력 완료
            </Button>

            <Box sx={{ mt: 2 }}>
                <Button variant="text" onClick={() => setModalMessage('약관 상세보기 미구현됨') || setOpenModal(true)}>
                    약관 보기(상세보기)
                </Button>
            </Box>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 300 }}
            >
                <Box className={styles.modal}>
                    <Typography className={styles.modalTitle}>
                        알림
                    </Typography>

                    <Typography className={styles.modalMessage} style={{ whiteSpace: 'pre-line' }}>
                        {modalMessage}
                    </Typography>

                    <Button
                        variant="contained"
                        className={styles.modalButton}
                        onClick={handleModalClose}
                    >
                        확인
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserRegister;