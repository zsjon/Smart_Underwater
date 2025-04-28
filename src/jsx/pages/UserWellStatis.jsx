import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import Sidebar from "../components/Sidebar";
import styles from "../../css/pages/WellList.module.css";
import { ArrowBackIosNew } from '@mui/icons-material';

const UserWellStatis = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                <Box p={4}>
                    {/* 타이틀 */}
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        전체 관정 그룹 통계
                    </Typography>

                    {/* 그래프 들어갈 박스 */}
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 3 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            전체 관정 평균 데이터 통계 그래프
                        </Typography>

                        <Box mt={2} textAlign="center" color="gray">
                            (여기에 모든 관정의 평균값 그래프 표시 예정)
                        </Box>
                    </Paper>

                    {/* 돌아가기 버튼 (필요 시) */}
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

export default UserWellStatis;
