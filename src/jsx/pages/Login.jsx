import React, { useState } from 'react';
import {
    Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography, Stack, Modal, Backdrop
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/pages/Login.module.css';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mode, setMode] = useState('login');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [foundId, setFoundId] = useState(null);
    const [resetStep, setResetStep] = useState('verify');
    const [resetUser, setResetUser] = useState('');
    const [resetPhone, setResetPhone] = useState('');
    const [resetId, setResetId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        if (id === 'admin' && password === 'admin123') {
            localStorage.setItem('role', 'admin');
            navigate('/dashboard');
        } else if (id === 'user' && password === 'user123') {
            localStorage.setItem('role', 'user');
            navigate('/dashboard');
        } else {
            setModalMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
            setModalOpen(true);
        }
    };

    const resetAll = () => {
        setMode('login');
        setUsername('');
        setPhone('');
        setFoundId(null);
        setResetStep('verify');
        setResetUser('');
        setResetPhone('');
        setResetId('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleModalClose = () => {
        setModalOpen(false);
        if (modalMessage === '비밀번호가 변경되었습니다.') {
            resetAll();
        }
    };

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.circle1} />
            <Box className={styles.circle2} />
            <Paper className={styles.paper} elevation={3}>
                <Typography variant="h5" className={styles.title}>㈜한결테크닉스</Typography>
                <Typography variant="h5" className={styles.title}>지하수도 관정 시스템</Typography>

                {mode === 'login' && (
                    <>
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                            <TextField fullWidth label="아이디" variant="outlined" sx={{ mb: 2 }}
                                       value={id} onChange={(e) => setId(e.target.value)} />
                            <TextField fullWidth label="비밀번호"
                                       type={showPassword ? 'text' : 'password'} variant="outlined" sx={{ mb: 1 }}
                                       value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FormControlLabel
                                control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
                                label="비밀번호 표시"
                            />
                            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                                LOGIN
                            </Button>
                        </form>
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                            <Button size="small" onClick={() => setMode('findId')}>아이디 찾기</Button>
                            <Button size="small" onClick={() => setMode('resetPw')}>비밀번호 찾기</Button>
                        </Stack>
                    </>
                )}

                {mode === 'findId' && (
                    <>
                        <Typography variant="h6" sx={{ mb: 2 }}>아이디 찾기</Typography>
                        <TextField fullWidth label="사용자명" variant="outlined" sx={{ mb: 2 }}
                                   value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField fullWidth label="전화번호" variant="outlined" sx={{ mb: 2 }}
                                   value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Button fullWidth variant="contained" color="primary"
                                onClick={() => setFoundId('example_id_2025')}>
                            찾기
                        </Button>
                        {foundId && (
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body1">
                                    당신의 아이디는 <strong>{foundId}</strong> 입니다.
                                </Typography>
                                <Button variant="text" sx={{ mt: 1 }} onClick={resetAll}>로그인 화면으로</Button>
                            </Box>
                        )}
                    </>
                )}

                {mode === 'resetPw' && resetStep === 'verify' && (
                    <>
                        <Typography variant="h6" sx={{ mb: 2 }}>비밀번호 찾기</Typography>
                        <TextField fullWidth label="사용자명" variant="outlined" sx={{ mb: 2 }}
                                   value={resetUser} onChange={(e) => setResetUser(e.target.value)} />
                        <TextField fullWidth label="아이디" variant="outlined" sx={{ mb: 2 }}
                                   value={resetId} onChange={(e) => setResetId(e.target.value)} />
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField fullWidth label="전화번호" variant="outlined" value={resetPhone} onChange={(e) => setResetPhone(e.target.value)}/>
                            <Button variant="contained" color="inherit"   sx={{ whiteSpace: 'nowrap' }}
                                    onClick={() => setShowVerificationCodeInput(true)}>
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
                        <Button fullWidth variant="contained" color="primary" onClick={() => setResetStep('change')}>
                            인증
                        </Button>
                    </>
                )}

                {mode === 'resetPw' && resetStep === 'change' && (
                    <>
                        <Typography variant="h6" sx={{ mb: 2 }}>새 비밀번호 입력</Typography>
                        <TextField fullWidth label="새 비밀번호" type="password" variant="outlined" sx={{ mb: 2 }}
                                   value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <TextField fullWidth label="비밀번호 확인" type="password" variant="outlined" sx={{ mb: 2 }}
                                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button fullWidth variant="contained" color="primary" onClick={() => {
                            if (newPassword !== confirmPassword) {
                                setModalMessage('비밀번호가 일치하지 않습니다.');
                                setModalOpen(true);
                            } else {
                                setModalMessage('비밀번호가 변경되었습니다.');
                                setModalOpen(true);
                            }
                        }}>
                            비밀번호 변경
                        </Button>
                    </>
                )}
            </Paper>

            {/* 모달 영역 */}
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 300 }}
            >
                <Box className={styles.modal}>
                    <Typography className={styles.modalTitle}>
                        로그인 오류
                    </Typography>
                    <Typography className={styles.modalMessage}>
                        {modalMessage}
                    </Typography>
                    <Button variant="contained" onClick={handleModalClose}>확인</Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Login;
