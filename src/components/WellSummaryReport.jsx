import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './WellSummaryReport.module.css';
import { TextField, Button, Typography, Box } from '@mui/material';

const dummyWellData = {
    id: 'W-001',
    name: '삼릉공원 관정',
    location: '서울 강동구 동남로',
};

const WellSummaryReport = () => {
    const { id } = useParams();
    const [formData, setFormData] = React.useState({
        startDate: '',
        endDate: '',
        totalPumped: '',
        averageLevel: '',
        errorCount: '',
        opinion: ''
    });

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handlePrint = async () => {
        const jsPDF = (await import('jspdf')).default;
        const html2canvas = (await import('html2canvas')).default;

        const reportContent = document.getElementById('report-summary');
        if (!reportContent) return;

        const canvas = await html2canvas(reportContent);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Well_Report_${id}.pdf`);
    };

    return (
        <Box className={styles.container} id="report-summary">
            <Typography variant="h5" gutterBottom>관정 보고서</Typography>

            <Box className={styles.section}>
                <Typography variant="subtitle1"><strong>관정명:</strong> {dummyWellData.name}</Typography>
                <Typography variant="subtitle1"><strong>위치:</strong> {dummyWellData.location}</Typography>
                <Typography variant="subtitle1"><strong>관정 ID:</strong> {id}</Typography>
            </Box>

            <Box className={styles.section}>
                <Typography variant="h6">📅 보고 기간</Typography>
                <Box display="flex" gap={2}>
                    <TextField
                        label="시작일"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.startDate}
                        onChange={handleChange('startDate')}
                        fullWidth
                    />
                    <TextField
                        label="종료일"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.endDate}
                        onChange={handleChange('endDate')}
                        fullWidth
                    />
                </Box>
            </Box>

            <Box className={styles.section}>
                <Typography variant="h6">📊 통계 내역</Typography>
                <TextField
                    label="총 양수량 (㎥)"
                    fullWidth
                    value={formData.totalPumped}
                    onChange={handleChange('totalPumped')}
                    margin="normal"
                />
                <TextField
                    label="평균 수위 (m)"
                    fullWidth
                    value={formData.averageLevel}
                    onChange={handleChange('averageLevel')}
                    margin="normal"
                />
                <TextField
                    label="이상 감지 횟수"
                    fullWidth
                    value={formData.errorCount}
                    onChange={handleChange('errorCount')}
                    margin="normal"
                />
            </Box>

            <Box className={styles.section}>
                <Typography variant="h6">📝 기타 의견</Typography>
                <TextField
                    label="기타 의견을 입력하세요"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.opinion}
                    onChange={handleChange('opinion')}
                    margin="normal"
                />
            </Box>

            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handlePrint}>
                    PDF 출력
                </Button>
            </Box>
        </Box>
    );
};

export default WellSummaryReport;