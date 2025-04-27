import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Modal, Backdrop, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/pages/UserRegister.module.css';

const UserRegister = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [agree, setAgree] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [userType, setUserType] = useState('');
    const [preFilledInfo, setPreFilledInfo] = useState({
        기관명: '',
        소속: '',
        기관전화번호: '',
        담당자명: '',
        사업자번호: '',
        사업자명: '',
        대표자명: '',
        담당자부서: '',
    });
    const navigate = useNavigate();

    // 인증 버튼 눌렀을 때 처리
    const handleVerify = () => {
        if (!name || !phone || !verificationCode) {
            setModalMessage('이름, 전화번호, 인증코드를 모두 입력해 주세요.');
            setOpenModal(true);
            return;
        }

        // 이름 값에 따라 사용자 타입 결정
        let selectedType = '';
        if (name === '1') selectedType = 'personal';
        else if (name === '2') selectedType = 'public';
        else if (name === '3') selectedType = 'company';
        else selectedType = 'personal'; // 기본 fallback

        setUserType(selectedType);
        setIsVerified(true);

        setPreFilledInfo({
            기관명: '공공기관명 예시',
            소속: '소속 예시',
            기관전화번호: '02-1234-5678',
            담당자명: '홍길동',
            사업자번호: '123-45-67890',
            사업자명: '테스트주식회사',
            대표자명: '대표 홍길동',
            담당자부서: '개발팀',
        });
    };

    const handleSubmit = () => {
        if (!isVerified) {
            setModalMessage('먼저 전화번호 인증을 완료해 주세요.');
            setOpenModal(true);
            return;
        }

        if (!agree) {
            setModalMessage('약관에 동의해주세요.');
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

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    fullWidth
                    label="전화번호"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={() => setShowVerificationCodeInput(true)}
                >
                    인증 번호 요청
                </Button>
            </Box>

            {showVerificationCodeInput && (
                <TextField
                    fullWidth
                    label="인증코드 입력"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
            )}

            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={handleVerify}
            >
                인증
            </Button>

            {isVerified && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>등록된 사용자 정보</Typography>

                    {userType === 'personal' && (
                        <>
                            <TextField fullWidth label="이름" value={preFilledInfo.담당자명} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="전화번호" value={preFilledInfo.기관전화번호} sx={{ mb: 2 }} disabled />
                        </>
                    )}

                    {userType === 'public' && (
                        <>
                            <TextField fullWidth label="기관명" value={preFilledInfo.기관명} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="소속" value={preFilledInfo.소속} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="기관 전화번호" value={preFilledInfo.기관전화번호} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="담당자명" value={preFilledInfo.담당자명} sx={{ mb: 2 }} disabled />
                        </>
                    )}

                    {userType === 'company' && (
                        <>
                            <TextField fullWidth label="사업자번호" value={preFilledInfo.사업자번호} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="사업자명" value={preFilledInfo.사업자명} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="대표자명" value={preFilledInfo.대표자명} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="전화번호" value={preFilledInfo.기관전화번호} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="담당자 부서" value={preFilledInfo.담당자부서} sx={{ mb: 2 }} disabled />
                            <TextField fullWidth label="담당자명" value={preFilledInfo.담당자명} sx={{ mb: 2 }} disabled />
                        </>
                    )}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                        }
                        label="약관에 동의합니다"
                        sx={{ mt: 2 }}
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
                        <Button
                            variant="text"
                            onClick={() => {
                                setModalMessage('약관 상세보기 미구현됨');
                                setOpenModal(true);
                            }}
                        >
                            약관 보기(상세보기)
                        </Button>
                    </Box>

                </Box>
            )}

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
