import React, { useState } from 'react';
import {
    Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography, Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mode, setMode] = useState('login'); // 'login' | 'findId' | 'resetPw'
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [foundId, setFoundId] = useState(null);
    const navigate = useNavigate();

    // 비밀번호 찾기 로직 상태들
    const [resetStep, setResetStep] = useState('verify'); // 'verify' or 'change'
    const [resetUser, setResetUser] = useState('');
    const [resetPhone, setResetPhone] = useState('');
    const [resetId, setResetId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = () => {
        if (id === 'admin' && password === 'admin123') {
            localStorage.setItem('role', 'admin');
            navigate('/dashboard');
        } else if (id === 'user' && password === 'user123') {
            localStorage.setItem('role', 'user');
            navigate('/dashboard');
        } else {
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
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

    return (
        <Box sx={{
            height: '100vh',
            backgroundColor: '#f2f6fa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Box sx={{
                position: 'absolute', width: 400, height: 400, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6bc1ff, #72d4c9)',
                top: -100, right: -100, opacity: 0.3
            }} />
            <Box sx={{
                position: 'absolute', width: 300, height: 300, borderRadius: '50%',
                background: 'linear-gradient(135deg, #a48bff, #9bc2ff)',
                bottom: -100, left: -100, opacity: 0.3
            }} />
            <Paper elevation={3} sx={{ p: 4, width: 360, zIndex: 2 }}>
                <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                    지하수도 관정 시스템
                </Typography>
                <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                    ㈜한결테크닉스
                </Typography>

                {mode === 'login' && (
                    <>
                        <TextField fullWidth label="아이디" variant="outlined" sx={{ mb: 2 }}
                                   value={id} onChange={(e) => setId(e.target.value)} />
                        <TextField fullWidth label="비밀번호"
                                   type={showPassword ? 'text' : 'password'} variant="outlined"
                                   sx={{ mb: 1 }} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <FormControlLabel
                            control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
                            label="비밀번호 표시" />
                        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                            LOGIN
                        </Button>
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
                        <TextField fullWidth label="전화번호" variant="outlined" sx={{ mb: 2 }}
                                   value={resetPhone} onChange={(e) => setResetPhone(e.target.value)} />
                        <TextField fullWidth label="아이디" variant="outlined" sx={{ mb: 2 }}
                                   value={resetId} onChange={(e) => setResetId(e.target.value)} />
                        <Button fullWidth variant="contained" color="primary"
                                onClick={() => setResetStep('change')}>
                            인증
                        </Button>
                    </>
                )}

                {mode === 'resetPw' && resetStep === 'change' && (
                    <>
                        <Typography variant="h6" sx={{ mb: 2 }}>새 비밀번호 입력</Typography>
                        <TextField fullWidth label="새 비밀번호" variant="outlined" type="password" sx={{ mb: 2 }}
                                   value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <TextField fullWidth label="비밀번호 확인" variant="outlined" type="password" sx={{ mb: 2 }}
                                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button fullWidth variant="contained" color="primary" onClick={() => {
                            if (newPassword !== confirmPassword) {
                                alert('비밀번호가 일치하지 않습니다.');
                            } else {
                                alert('비밀번호가 변경되었습니다.');
                                resetAll();
                            }
                        }}>
                            비밀번호 변경
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default Login;