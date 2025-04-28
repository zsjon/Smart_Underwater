import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import Sidebar from "../components/Sidebar";
import styles from "../../css/pages/WellList.module.css";

const UserWellStatisDetail = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const item = searchParams.get('item');

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                <Box p={4}>
                    {/* 상단 제목 */}
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {item ? `${item} 통계 (관정 ${id})` : `관정 ${id} 통계`}
                    </Typography>

                    {/* 데이터 표시 영역 */}
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 3 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {item ? `${item} 데이터 통계 그래프` : '관정 데이터 통계 그래프'}
                        </Typography>

                        <Box mt={2} textAlign="center" color="gray">
                            (여기에 실제 그래프나 통계 데이터가 들어갈 자리)
                        </Box>
                    </Paper>

                    {/* 돌아가기 버튼 */}
                    <Box mt={5} textAlign="center">
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIosNew />}
                            sx={{
                                px: 4,
                                py: 1.8,
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                borderRadius: 3,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                            onClick={() => window.history.back()}
                        >
                            돌아가기
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default UserWellStatisDetail;
