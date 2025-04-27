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

const UserWellStatis = () => {
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
        <div>
            통계 ^^
        </div>
    );
};

export default UserWellStatis;
