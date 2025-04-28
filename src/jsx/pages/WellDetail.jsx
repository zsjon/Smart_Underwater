import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../css/pages/WellDetail.module.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ConfirmSwitchModal from '../components/ConfirmSwitchModal';
import {
    Modal, FormControl, InputLabel, Select, MenuItem,
    Button, Box, Paper, Typography, TextField, Switch
} from '@mui/material';

const WellDetail = () => {
    const { id } = useParams();
    const role = localStorage.getItem('role') || 'admin';

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
            motorControl: false,
            doorControl: false,
            files: [
                { name: '시공사진.jpg', url: '/files/image1.jpg' },
                { name: '관정보고서.pdf', url: '/files/report.pdf' },
                { name: '수질검사결과.hwp', url: '/files/test.hwp' },
            ],
        },
    ];

    const well = dummyData.find(w => w.id.toString() === id);
    const [editedData, setEditedData] = useState({...well});
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingSwitchField, setPendingSwitchField] = useState('');

    if (!well) return <div>관정을 찾을 수 없습니다.</div>;

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({...prev, [field]: value}));
    };

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

    const handleSwitchClick = (field) => {
        if (role === 'user') {
            setPendingSwitchField(field);
            setConfirmOpen(true);
        } else {
            well[field] = !well[field];
        }
    };

    const confirmSwitchChange = () => {
        if (pendingSwitchField) {
            well[pendingSwitchField] = !well[pendingSwitchField];
        }
        setPendingSwitchField('');
        setConfirmOpen(false);
    };

    const cancelSwitchChange = () => {
        setPendingSwitchField('');
        setConfirmOpen(false);
    };

    const handleCancelEdit = () => {
        setEditedData({...well});
        setIsEditing(false);
    };

    const handleSaveEdit = () => {
        console.log('수정된 데이터:', editedData);
        setIsEditing(false);
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Navbar title="상세정보" />

                {role === 'admin' ? (
                    <Box className={styles.content}>
                        <Box className={styles.editButtonBox}>
                            {isEditing ? (
                                <>
                                    <Button variant="outlined" onClick={handleCancelEdit}>취소</Button>
                                    <Button variant="contained" sx={{ ml: 1 }} onClick={handleSaveEdit}>저장</Button>
                                </>
                            ) : (
                                <Button variant="contained" onClick={() => setIsEditing(true)}>수정</Button>
                            )}
                        </Box>

                        <Paper className={styles.fieldBox}>
                            <Typography variant="h6" gutterBottom>📍 위치 및 기본 정보</Typography>
                            <TextField label="관정넘버" fullWidth value={editedData.wellNumber}
                                       onChange={e => handleInputChange('wellNumber', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="주소" fullWidth value={editedData.region}
                                       onChange={e => handleInputChange('region', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="위치" fullWidth value={editedData.location}
                                       onChange={e => handleInputChange('location', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="허가번호" fullWidth value={editedData.permitNumber}
                                       onChange={e => handleInputChange('permitNumber', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="허가일" fullWidth value={editedData.permitDate}
                                       onChange={e => handleInputChange('permitDate', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="시공사" fullWidth value={editedData.builder}
                                       onChange={e => handleInputChange('builder', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                        </Paper>

                        {/* 🛠️ 지하수 시설 및 구조 */}
                        <Paper className={styles.fieldBox}>
                            <Typography variant="h6" gutterBottom>🛠️ 지하수 시설 및 구조</Typography>
                            <TextField label="동력장치 정보" fullWidth value={editedData.powerUnit}
                                       onChange={e => handleInputChange('powerUnit', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="굴착 깊이" fullWidth value={`${editedData.depth}m`}
                                       onChange={e => handleInputChange('depth', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="굴착 지름" fullWidth value={editedData.drillDiameter}
                                       onChange={e => handleInputChange('drillDiameter', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="토출관 지름" fullWidth value={editedData.pipeDiameter}
                                       onChange={e => handleInputChange('pipeDiameter', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="모터 설치 깊이" fullWidth value={editedData.motorDepth}
                                       onChange={e => handleInputChange('motorDepth', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="부가장치 정보" fullWidth value={editedData.additionalEquipment}
                                       onChange={e => handleInputChange('additionalEquipment', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                        </Paper>

                        {/* 💧 용도 및 운영 정보 */}
                        <Paper className={styles.fieldBox}>
                            <Typography variant="h6" gutterBottom>💧 용도 및 운영 정보</Typography>
                            <TextField label="용도" fullWidth value={editedData.usage}
                                       onChange={e => handleInputChange('usage', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="양수능력" fullWidth value={editedData.pumpingCapacity}
                                       onChange={e => handleInputChange('pumpingCapacity', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="취수능력" fullWidth value={editedData.intakeCapacity}
                                       onChange={e => handleInputChange('intakeCapacity', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="수질정보" fullWidth value={editedData.waterQuality}
                                       onChange={e => handleInputChange('waterQuality', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                        </Paper>

                        {/* 🎥 CCTV 정보 */}
                        <Paper className={styles.fieldBox}>
                            <Typography variant="h6" gutterBottom>🎥 CCTV 정보</Typography>
                            <TextField label="CCTV 웹 주소" fullWidth value={editedData.cctvUrl}
                                       onChange={e => handleInputChange('cctvUrl', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="계정 정보" fullWidth value={editedData.cctvAccount}
                                       onChange={e => handleInputChange('cctvAccount', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                        </Paper>

                        {/* 👤 소유자 정보 */}
                        <Paper className={styles.fieldBox}>
                            <Typography variant="h6" gutterBottom>👤 소유자 정보</Typography>
                            <TextField label="소유자명" fullWidth value={editedData.owner}
                                       onChange={e => handleInputChange('owner', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                            <TextField label="연락처" fullWidth value={editedData.ownerContact}
                                       onChange={e => handleInputChange('ownerContact', e.target.value)}
                                       InputProps={{ readOnly: !isEditing }} margin="dense" />
                        </Paper>

                        {/* 파일 목록 */}
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
                                    <th><input type="checkbox" onChange={handleSelectAll} checked={selectedFiles.length === well.files.length} /></th>
                                    <th>No</th>
                                    <th>이름</th>
                                    <th>다운로드</th>
                                </tr>
                                </thead>
                                <tbody>
                                {well.files.map((file, idx) => (
                                    <tr key={idx}>
                                        <td><input type="checkbox" checked={selectedFiles.includes(idx)} onChange={() => handleCheckboxChange(idx)} /></td>
                                        <td>{idx + 1}</td>
                                        <td>{file.name}</td>
                                        <td><a href={file.url} download>다운로드</a></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Paper>

                        {/* 파일 업로드 모달 */}
                        <Modal open={openUploadModal} onClose={() => { setOpenUploadModal(false); setSelectedFileName(""); }}>
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
                                    <input type="file" accept="image/*" hidden onChange={(e) => {
                                        if (e.target.files.length > 0) {
                                            setSelectedFileName(e.target.files[0].name);
                                        }
                                    }} />
                                </Button>
                                {selectedFileName && (
                                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                                        선택된 파일: {selectedFileName}
                                    </Typography>
                                )}
                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <Button onClick={() => { setOpenUploadModal(false); setSelectedFileName(""); }}>취소</Button>
                                    <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>업로드</Button>
                                </Box>
                            </Box>
                        </Modal>

                    </Box>
                ) : (
                    // 사용자 화면
                    <Box className={styles.content}>
                        <Paper className={styles.fieldBox}>
                            <Typography variant="h6" gutterBottom>관정 기본 정보</Typography>
                            <TextField label="관정명" fullWidth value={well.name} InputProps={{ readOnly: true }} margin="dense" />
                            <TextField label="주소" fullWidth value={well.region} InputProps={{ readOnly: true }} margin="dense" />
                            <TextField label="위치" fullWidth value={well.location} InputProps={{ readOnly: true }} margin="dense" />
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1">모터 제어 (On/Off)</Typography>
                                <Switch checked={well.motorControl} onChange={() => handleSwitchClick('motorControl')} />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1">도어 제어 (On/Off)</Typography>
                                <Switch checked={well.doorControl} onChange={() => handleSwitchClick('doorControl')} />
                            </Box>
                            <Box sx={{ mt: 4 }}>
                                <Button variant="outlined" fullWidth>통계 보기</Button>
                            </Box>
                        </Paper>

                        <ConfirmSwitchModal
                            open={confirmOpen}
                            onConfirm={confirmSwitchChange}
                            onCancel={cancelSwitchChange}
                            onClose={cancelSwitchChange}
                        />
                    </Box>
                )}
            </div>
        </div>
    );
};

export default WellDetail;