import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!agree) {
            alert('약관에 동의해주세요');
            return;
        }
        if (!name || !phone) {
            alert('입력 정보를 다시 확인하세요');
            return;
        }
        alert('등록해주셔서 감사합니다. 계정 정보가 전달되었습니다.');
        navigate('/');
    };

    return (
        <Box sx={{ p: 4, maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>사용자 정보 등록</Typography>
            <TextField fullWidth label="이름" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="휴대전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 2 }} />

            {/* 여기에 기관, 기업, 개인에 따른 항목은 후처리 예정 */}

            <FormControlLabel
                control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
                label="약관에 동의합니다"
            />

            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                입력 완료
            </Button>

            <Box sx={{ mt: 2 }}>
                <Button variant="text" onClick={() => alert('약관 상세 페이지로 이동')}>
                    약관 보기(상세보기)
                </Button>
            </Box>
        </Box>
    );
};

export default UserRegister;