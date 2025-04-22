import React, { useState } from 'react';
import {
    Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (id === 'admin' && password === 'admin123') {
            localStorage.setItem('role', 'admin');
            navigate('/dashboard');
        } else if (id === 'user' && password === 'user123') {
            localStorage.setItem('role', 'user');
            navigate('/dashboard');
        }
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
                <TextField
                    fullWidth label="아이디" variant="outlined" sx={{ mb: 2 }}
                    value={id} onChange={(e) => setId(e.target.value)}
                />
                <TextField
                    fullWidth label="비밀번호" type="password" variant="outlined" sx={{ mb: 2 }}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <FormControlLabel control={<Checkbox />} label="아이디 저장" />
                    <FormControlLabel control={<Checkbox />} label="비밀번호 표시" />
                </Box>
                <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                    LOGIN
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;