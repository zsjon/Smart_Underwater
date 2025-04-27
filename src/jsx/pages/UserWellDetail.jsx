import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ConfirmSwitchModal from '../components/ConfirmSwitchModal';
import { Box, Button, Paper, Switch, TextField, Typography } from '@mui/material';
import styles from '../../css/pages/WellDetail.module.css';

const dummyData = [
    {
        id: 1,
        wellNumber: 'W-001',
        name: '관정 A',
        region: '서울 강동구 천호동',
        motorStatus: '정상',
        doorStatus: '오류',
        motorSwitch: true,
        doorSwitch: false,
    },
    {
        id: 2,
        wellNumber: 'W-002',
        name: '관정 B',
        region: '서울 강남구 역삼동',
        motorStatus: '오류',
        doorStatus: '정상',
        motorSwitch: false,
        doorSwitch: true,
    },
];

const UserWellDetail = () => {
    const { id } = useParams();
    const well = dummyData.find(w => w.id.toString() === id);

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...well });
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingSwitch, setPendingSwitch] = useState(null);

    const navigate = useNavigate();

    if (!well) return <div>관정을 찾을 수 없습니다.</div>;

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    const handleOpenModal = (field) => {
        setPendingSwitch(field);
        setModalOpen(true);
    };

    const handleConfirmSwitch = () => {
        if (!pendingSwitch) return;
        setEditedData(prev => ({
            ...prev,
            [pendingSwitch]: !prev[pendingSwitch],
        }));
        setPendingSwitch(null);
        setModalOpen(false);
    };

    const handleCancelSwitch = () => {
        setPendingSwitch(null);
        setModalOpen(false);
    };

    const handleCancelEdit = () => {
        setEditedData({ ...well });
        setIsEditing(false);
    };

    const handleSave = () => {
        console.log('저장됨:', editedData);
        setIsEditing(false);
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Navbar title="상세정보" />

                <Box className={styles.editButtonBox}>
                    {isEditing ? (
                        <>
                            <Button variant="outlined" onClick={handleCancelEdit}>취소</Button>
                            <Button variant="contained" sx={{ ml: 1 }} onClick={handleSave}>저장</Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={() => setIsEditing(true)}>수정</Button>
                    )}
                </Box>

                <Box className={styles.content}>
                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>기본 정보</Typography>
                        <TextField label="이름" fullWidth value={editedData.name}
                                   onChange={e => handleInputChange('name', e.target.value)}
                                   InputProps={{ readOnly: !isEditing }} margin="dense" />

                        <TextField label="주소" fullWidth value={editedData.region}
                                   onChange={e => handleInputChange('region', e.target.value)}
                                   InputProps={{ readOnly: !isEditing }} margin="dense" />

                        <TextField label="모터 상태" fullWidth value={editedData.motorStatus}
                                   onChange={e => handleInputChange('motorStatus', e.target.value)}
                                   InputProps={{ readOnly: !isEditing }} margin="dense" />

                        <TextField label="도어 상태" fullWidth value={editedData.doorStatus}
                                   onChange={e => handleInputChange('doorStatus', e.target.value)}
                                   InputProps={{ readOnly: !isEditing }} margin="dense" />

                        <Box display="flex" alignItems="center" marginBottom={2}>
                            <Typography>모터 제어</Typography>
                            <Switch
                                checked={editedData.motorSwitch}
                                onChange={() => handleOpenModal('motorSwitch')}
                                disabled={!isEditing}
                                color="primary"
                            />
                        </Box>

                        <Box display="flex" alignItems="center">
                            <Typography>도어 제어</Typography>
                            <Switch
                                checked={editedData.doorSwitch}
                                onChange={() => handleOpenModal('doorSwitch')}
                                disabled={!isEditing}
                                color="primary"
                            />
                        </Box>
                        <Box className={styles.bottomLink}>
                            <Button variant="text" color="primary" onClick={() => navigate(`/userWells/${id}/statistics`)}>
                                ▶ 통계 보기
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </div>

            <ConfirmSwitchModal
                open={modalOpen}
                onClose={handleCancelSwitch}
                onConfirm={handleConfirmSwitch}
            />
        </div>
    );
};

export default UserWellDetail;
