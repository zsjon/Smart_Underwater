// import React from 'react';
// import {useParams} from 'react-router-dom';
// import styles from '../../css/pages/WellDetail.module.css';
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import {Box, Button, Paper, TextField, Typography} from '@mui/material';
//
// const AdminWellDetail = () => {
//     const { id } = useParams();
//     const dummyData = [{
//         id: 1,
//         name: '관정 A',
//         wellNumber: 'W-001',
//         region: '서울 강동구 천호동',
//         location: '37.5665, 126.9780',
//         permitNumber: 'ABC-123',
//         permitDate: '2023-05-12',
//         builder: '한결테크닉스',
//         depth: 100,
//         drillDiameter: '150mm',
//         pipeDiameter: '50mm',
//         motorDepth: '30m',
//         powerUnit: '전기모터',
//         additionalEquipment: '역류방지밸브, 유량계',
//         usage: '농업용수',
//         pumpingCapacity: '150㎥/일',
//         intakeCapacity: '100㎥/일',
//         waterQuality: '양호',
//         cctvUrl: 'http://cctv-viewer.hantech.co.kr/well01',
//         cctvAccount: 'user01 / pass1234',
//         owner: '홍길동',
//         ownerContact: '010-1234-5678',
//         motorStatus: '정상',
//         doorStatus: '정상',
//         files: [
//             {name: '시공사진.jpg', url: '/files/image1.jpg'},
//             {name: '관정보고서.pdf', url: '/files/report.pdf'},
//             {name: '수질검사결과.hwp', url: '/files/test.hwp'},
//         ],
//     }];
//
//     const well = dummyData.find(w => w.id.toString() === id);
//     const [isEditing, setIsEditing] = React.useState(false);
//     const [editedData, setEditedData] = React.useState({...well});
//
//     const handleInputChange = (field, value) => {
//         setEditedData(prev => ({...prev, [field]: value}));
//     };
//
//     if (!well) return <div>관정을 찾을 수 없습니다.</div>;
//
//     return (
//         <div className={styles.layout}>
//             <Sidebar />
//             <div className={styles.mainContent}>
//                 <Navbar title="상세정보" />
//                 <Box className={styles.editButtonBox}>
//                     {isEditing ? (
//                         <>
//                             <Button variant="outlined" onClick={() => { setEditedData({ ...well }); setIsEditing(false); }}>취소</Button>
//                             <Button variant="contained" sx={{ ml: 1 }} onClick={() => { console.log('저장됨', editedData); setIsEditing(false); }}>저장</Button>
//                         </>
//                     ) : (
//                         <Button variant="contained" onClick={() => setIsEditing(true)}>수정</Button>
//                     )}
//                 </Box>
//
//                 <Box className={styles.content}>
//                     <Paper className={styles.fieldBox}>
//                         <Typography variant="h6" gutterBottom>위치 및 기본 정보</Typography>
//                         <TextField label="관정넘버" fullWidth value={editedData.wellNumber}
//                                    onChange={e => handleInputChange('wellNumber', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="주소" fullWidth value={editedData.region}
//                                    onChange={e => handleInputChange('region', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="위치" fullWidth value={editedData.location}
//                                    onChange={e => handleInputChange('location', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="허가번호" fullWidth value={editedData.permitNumber}
//                                    onChange={e => handleInputChange('permitNumber', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="허가일" fullWidth value={editedData.permitDate}
//                                    onChange={e => handleInputChange('permitDate', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="시공사" fullWidth value={editedData.builder}
//                                    onChange={e => handleInputChange('builder', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                     </Paper>
//
//                     <Paper className={styles.fieldBox}>
//                         <Typography variant="h6" gutterBottom>지하수 시설 및 구조</Typography>
//                         <TextField label="동력장치 정보" fullWidth value={editedData.powerUnit}
//                                    onChange={e => handleInputChange('powerUnit', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="굴착 깊이" fullWidth value={editedData.depth}
//                                    onChange={e => handleInputChange('depth', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="굴착 지름" fullWidth value={editedData.drillDiameter}
//                                    onChange={e => handleInputChange('drillDiameter', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="토출관 지름" fullWidth value={editedData.pipeDiameter}
//                                    onChange={e => handleInputChange('pipeDiameter', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="모터 설치 깊이" fullWidth value={editedData.motorDepth}
//                                    onChange={e => handleInputChange('motorDepth', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="부가장치 정보" fullWidth value={editedData.additionalEquipment}
//                                    onChange={e => handleInputChange('additionalEquipment', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                     </Paper>
//
//                     <Paper className={styles.fieldBox}>
//                         <Typography variant="h6" gutterBottom>용도 및 운영 정보</Typography>
//                         <TextField label="용도" fullWidth value={editedData.usage}
//                                    onChange={e => handleInputChange('usage', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="양수능력" fullWidth value={editedData.pumpingCapacity}
//                                    onChange={e => handleInputChange('pumpingCapacity', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="취수능력" fullWidth value={editedData.intakeCapacity}
//                                    onChange={e => handleInputChange('intakeCapacity', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="수질정보" fullWidth value={editedData.waterQuality}
//                                    onChange={e => handleInputChange('waterQuality', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                     </Paper>
//
//                     <Paper className={styles.fieldBox}>
//                         <Typography variant="h6" gutterBottom>CCTV 정보</Typography>
//                         <TextField label="CCTV 웹 주소" fullWidth value={editedData.cctvUrl}
//                                    onChange={e => handleInputChange('cctvUrl', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="계정 정보" fullWidth value={editedData.cctvAccount}
//                                    onChange={e => handleInputChange('cctvAccount', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                     </Paper>
//
//                     <Paper className={styles.fieldBox}>
//                         <Typography variant="h6" gutterBottom>소유자 정보</Typography>
//                         <TextField label="소유자명" fullWidth value={editedData.owner}
//                                    onChange={e => handleInputChange('owner', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                         <TextField label="연락처" fullWidth value={editedData.ownerContact}
//                                    onChange={e => handleInputChange('ownerContact', e.target.value)}
//                                    InputProps={{readOnly: !isEditing}} margin="dense"/>
//                     </Paper>
//                 </Box>
//             </div>
//         </div>
//     );
// };
//
// export default AdminWellDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../css/pages/WellDetail.module.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const AdminWellDetail = () => {
    const { id } = useParams();
    const numericId = Number(id); // ✅ 문자열을 숫자로 변환

    const [well, setWell] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isNaN(numericId)) {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/wells/${numericId}/detail`)
                .then(res => {
                    console.log("전체 응답:", res.data);
                    setWell(res.data); // 👈 수정
                    setEditedData(res.data); // 👈 수정
                })
                .catch(err => console.error("관정 데이터를 불러오는 데 실패했습니다.", err));
        }
    }, [numericId]);

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    if (!well) return <div>관정을 찾을 수 없습니다.</div>;

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Navbar title="상세정보" />
                <Box className={styles.editButtonBox}>
                    {isEditing ? (
                        <>
                            <Button variant="outlined" onClick={() => {
                                setEditedData({ ...well });
                                setIsEditing(false);
                            }}>취소</Button>
                            <Button variant="contained" sx={{ ml: 1 }} onClick={() => {
                                console.log('저장됨:', editedData);
                                setIsEditing(false);
                            }}>저장</Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={() => setIsEditing(true)}>수정</Button>
                    )}
                </Box>

                <Box className={styles.content}>
                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>📍 위치 및 기본 정보</Typography>
                        <TextField label="관정 이름" fullWidth value={editedData.name || ''} onChange={e => handleInputChange('name', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="위도" fullWidth value={editedData.lat || ''} onChange={e => handleInputChange('lat', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="경도" fullWidth value={editedData.lng || ''} onChange={e => handleInputChange('lng', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="상태" fullWidth value={editedData.status || ''} onChange={e => handleInputChange('status', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>🛠️ 시설 정보</Typography>
                        <TextField label="지름(mm)" fullWidth value={editedData.diameter || ''} onChange={e => handleInputChange('diameter', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="깊이(m)" fullWidth value={editedData.depth || ''} onChange={e => handleInputChange('depth', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="표고(m)" fullWidth value={editedData.elevation || ''} onChange={e => handleInputChange('elevation', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="펌프 설치 깊이(m)" fullWidth value={editedData.pumpInstallationDepth || ''} onChange={e => handleInputChange('pumpInstallationDepth', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6" gutterBottom>💧 운영 정보</Typography>
                        <TextField label="용도" fullWidth value={editedData.purpose || ''} onChange={e => handleInputChange('purpose', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="취수 계획량(m³/일)" fullWidth value={editedData.plannedIntakeQuantity || ''} onChange={e => handleInputChange('plannedIntakeQuantity', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="양수능력(m³/일)" fullWidth value={editedData.usage || ''} onChange={e => handleInputChange('usage', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                        <TextField label="저수용량(m³)" fullWidth value={editedData.amnioticCapacity || ''} onChange={e => handleInputChange('amnioticCapacity', e.target.value)} InputProps={{ readOnly: !isEditing }} margin="dense" />
                    </Paper>
                </Box>
            </div>
        </div>
    );
};

export default AdminWellDetail;