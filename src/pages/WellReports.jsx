import React from 'react';
import styles from './WellReports.module.css';
import {Box, Button, Paper, Typography} from '@mui/material';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";

const dummyData = [
    {
        id: 1,
        wellNumber: 'W-001',
        name: '강동1관정',
        location: '서울 강동구 천호동',
    },
    {
        id: 2,
        wellNumber: 'W-002',
        name: '강서2관정',
        location: '서울 강서구 화곡동',
    }
];

const WellReports = () => {
    const navigate = useNavigate();

    const handleCardReport = (id) => {
        window.open(`/wells/report/card/${id}`, '_blank');
    };

    const handleSummaryReport = (id) => {
        window.open(`/wells/report/summary/${id}`, '_blank');
    };

    return (
        <Box className={styles.container}>
            <Sidebar/>
            <div className={styles.main}>
                <Navbar title="관정 보고서" />
                <Paper className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>관정넘버</th>
                            <th>관정명</th>
                            <th>위치</th>
                            <th>지하수 관리 카드</th>
                            <th>보고서</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dummyData.map((row, idx) => (
                            <tr key={row.id}>
                                <td>{idx + 1}</td>
                                <td>{row.wellNumber}</td>
                                <td>{row.name}</td>
                                <td>{row.location}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleCardReport(row.id)}
                                    >
                                        지하수 관리 카드
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        onClick={() => handleSummaryReport(row.id)}
                                    >
                                        보고서 출력
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Paper>
            </div>
        </Box>
    );
};

export default WellReports;