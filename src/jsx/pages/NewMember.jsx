import React, { useState } from 'react';
import styles from '../css/pages/NewMember.module.css';
import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography,
    Divider
} from '@mui/material';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";

const NewMember = () => {
    const navigate = useNavigate();
    const [memberType, setMemberType] = useState('');
    const [form, setForm] = useState({
        organization: '',
        department: '',
        phone: '',
        manager: '',
        businessNumber: '',
        workplace: '',
        representative: '',
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSendLink = () => {
        alert('링크가 발송되었습니다.');
        navigate('/users');

    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <Box className={styles.main}>
                <Navbar title="신규 회원 등록" />
                <Paper className={styles.paper}>
                    <Typography variant="h6">회원 구분 선택</Typography>
                    <Divider sx={{ my: 2 }} />

                    <TextField
                        select
                        label="공통"
                        value={memberType}
                        onChange={(e) => setMemberType(e.target.value)}
                        className={styles.selectField}
                        size="small"
                    >
                        {/*<MenuItem value="공통">공통</MenuItem>*/}
                        <MenuItem value="공공기관">공공기관</MenuItem>
                        <MenuItem value="기업">기업</MenuItem>
                        <MenuItem value="개인">개인</MenuItem>
                    </TextField>

                    {/* 입력 폼 */}
                    <div className={styles.formArea}>
                        {/*{memberType === '공통' && (*/}
                        {/*    <TextField*/}
                        {/*        name="organization"*/}
                        {/*        label="귀속 관정 선택"*/}
                        {/*        value={form.organization}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        fullWidth*/}
                        {/*        size="small"*/}
                        {/*    />*/}
                        {/*)}*/}

                        {memberType === '공공기관' && (
                            <>
                                <TextField
                                    name="organization"
                                    label="기관명"
                                    value={form.organization}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="department"
                                    label="소속"
                                    value={form.department}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="phone"
                                    label="전화번호"
                                    value={form.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="manager"
                                    label="담당자명"
                                    value={form.manager}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                            </>
                        )}

                        {memberType === '기업' && (
                            <>
                                <TextField
                                    name="businessNumber"
                                    label="사업자번호"
                                    value={form.businessNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="workplace"
                                    label="사업장명"
                                    value={form.workplace}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="representative"
                                    label="대표자명"
                                    value={form.representative}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="phone"
                                    label="전화번호"
                                    value={form.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="department"
                                    label="담당자 부서"
                                    value={form.department}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="manager"
                                    label="담당자명"
                                    value={form.manager}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                            </>
                        )}

                        {memberType === '개인' && (
                            <>
                                <TextField
                                    name="name"
                                    label="이름"
                                    value={form.name}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    name="phone"
                                    label="전화번호"
                                    value={form.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                            </>
                        )}
                    </div>

                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={handleSendLink}>
                            링크 발송
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
};

export default NewMember;