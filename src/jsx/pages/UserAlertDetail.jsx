// UserAlertDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import styles from "../../css/pages/WellList.module.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserNotiTable from "../components/UserNotiTable";

const alertSampleData = [
    {
        id: 1,
        category: '관정A',
        title: '수위 이상 발생',
        content: '현재 수위가 설정된 안전 범위를 벗어났습니다.',
        date: '2025-04-29 14:00:00',
    },
    {
        id: 2,
        category: '관정A',
        title: '도어락 열림',
        content: '도어락이 관리자1에 의해 14:03에 정상적으로 열렸습니다.',
        date: '2025-04-29 14:03:00',
    },
    {
        id: 3,
        category: '관정B',
        title: '움직임 감지 발생',
        content: 'CCTV에서 14:10 움직임이 감지되었습니다.',
        date: '2025-04-29 14:10:00',
    },
];

const UserAlertDetail = () => {
    const { id } = useParams();
    const alert = alertSampleData.find((item) => item.id.toString() === id);

    if (!alert) {
        return <Typography p={4}>해당 알림을 찾을 수 없습니다.</Typography>;
    }

    return (
        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.main}>
                <Navbar title="알림 목록"/>
                <Box p={4}>
                    <Paper elevation={3} style={{padding: '24px'}}>
                        <Typography variant="h5" gutterBottom>알림 상세 정보</Typography>
                        <Typography><strong>관정명:</strong> {alert.category}</Typography>
                        <Typography><strong>제목:</strong> {alert.title}</Typography>
                        <Typography><strong>내용:</strong> {alert.content}</Typography>
                        <Typography><strong>날짜:</strong> {alert.date}</Typography>
                    </Paper>
                </Box>
            </div>
        </div>
    );
};

export default UserAlertDetail;
