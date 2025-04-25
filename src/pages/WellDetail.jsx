import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './WellDetail.module.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    Modal,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Paper,
    Typography,
    TextField
} from '@mui/material';

const WellDetail = () => {
    const { id } = useParams();
    const dummyData = [
        {
            id: 1,
            name: '관정 A',
            wellNumber: 'W-001',
            region: '서울 강동구 천호동',
            location: '37.5665, 126.9780',
            permitNumber: 'ABC-123',
            permitDate: '2023-05-12',
            builder: '한결테크닉스',
            depth: 100,
            drillDiameter: '150mm',
            pipeDiameter: '50mm',
            motorDepth: '30m',
            powerUnit: '전기모터',
            additionalEquipment: '역류방지밸브, 유량계',
            usage: '농업용수',
            pumpingCapacity: '150㎥/일',
            intakeCapacity: '100㎥/일',
            waterQuality: '양호',
            cctvUrl: 'http://cctv-viewer.hantech.co.kr/well01',
            cctvAccount: 'user01 / pass1234',
            owner: '홍길동',
            ownerContact: '010-1234-5678',
            motorStatus: '정상',
            doorStatus: '정상',
            files: [
                { name: '시공사진.jpg', url: '/files/image1.jpg' },
                { name: '관정보고서.pdf', url: '/files/report.pdf' },
                { name: '수질검사결과.hwp', url: '/files/test.hwp' },
            ],
        },
    ];

    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedFiles(well.files.map((_, idx) => idx));
        } else {
            setSelectedFiles([]);
        }
    };
    const handleCheckboxChange = (index) => {
        setSelectedFiles(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const [openUploadModal, setOpenUploadModal] = React.useState(false);

    const [selectedFileName, setSelectedFileName] = React.useState("");

    const well = dummyData.find((w) => w.id.toString() === id);

    if (!well) return <div>관정을 찾을 수 없습니다.</div>;

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Navbar title="상세정보" />
                <Box className={styles.content}>
                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>📍 위치 및 기본 정보</Typography>
                        <TextField label="관정넘버" fullWidth value={well.wellNumber} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="주소" fullWidth value={well.region} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="위치" fullWidth value={well.location} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="허가번호" fullWidth value={well.permitNumber} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="허가일" fullWidth value={well.permitDate} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="시공사" fullWidth value={well.builder} InputProps={{ readOnly: true }} margin="dense" />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>🛠️ 지하수 시설 및 구조</Typography>
                        <TextField label="동력장치 정보" fullWidth value={well.powerUnit} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="굴착 깊이" fullWidth value={`${well.depth}m`} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="굴착 지름" fullWidth value={well.drillDiameter} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="토출관 지름" fullWidth value={well.pipeDiameter} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="모터 설치 깊이" fullWidth value={well.motorDepth} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="부가장치 정보" fullWidth value={well.additionalEquipment} InputProps={{ readOnly: true }} margin="dense" />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>💧 용도 및 운영 정보</Typography>
                        <TextField label="용도" fullWidth value={well.usage} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="양수능력" fullWidth value={well.pumpingCapacity} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="취수능력" fullWidth value={well.intakeCapacity} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="수질정보" fullWidth value={well.waterQuality} InputProps={{ readOnly: true }} margin="dense" />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>🎥 CCTV 정보</Typography>
                        <TextField label="CCTV 웹 주소" fullWidth value={well.cctvUrl} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="계정 정보" fullWidth value={well.cctvAccount} InputProps={{ readOnly: true }} margin="dense" />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>👤 소유자 정보</Typography>
                        <TextField label="소유자명" fullWidth value={well.owner} InputProps={{ readOnly: true }} margin="dense" />
                        <TextField label="연락처" fullWidth value={well.ownerContact} InputProps={{ readOnly: true }} margin="dense" />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">📁 파일 목록</Typography>
                            <Box>
                                <button className={styles.actionButton} onClick={() => setOpenUploadModal(true)}>추가</button>
                                <button className={styles.actionButton}>전체 삭제</button>
                            </Box>
                        </Box>
                        <table className={styles.fileTable}>
                            <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedFiles.length === well.files.length}
                                    />
                                </th>
                                <th>No</th>
                                <th>이름</th>
                                <th>다운로드</th>
                            </tr>
                            </thead>
                            <tbody>
                            {well.files.map((file, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedFiles.includes(idx)}
                                            onChange={() => handleCheckboxChange(idx)}
                                        />
                                    </td>
                                    <td>{idx + 1}</td>
                                    <td>{file.name}</td>
                                    <td><a href={file.url} download>다운로드</a></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Paper>
                </Box>
                <Modal open={openUploadModal} onClose={() => setOpenUploadModal(false)}>
                    <Box className={styles.modalBox}>
                        <Typography variant="h6" gutterBottom>📤 파일 업로드</Typography>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>구분</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="허가 관련 공문">허가 관련 공문</MenuItem>
                                <MenuItem value="수질 검사서">수질 검사서</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField fullWidth label="제목" margin="normal" />
                        <Button variant="outlined" component="label" fullWidth sx={{ marginTop: 2 }}>
                            파일 선택
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setSelectedFileName(e.target.files[0].name);
                                    }
                                }}
                            />
                        </Button>

                        {selectedFileName && (
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                선택된 파일: {selectedFileName}
                            </Typography>
                        )}

                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button onClick={() => {
                                setOpenUploadModal(false);
                                setSelectedFileName("");
                            }}>
                                취소
                            </Button>
                            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
                                업로드
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default WellDetail;