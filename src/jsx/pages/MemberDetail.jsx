import React from 'react';
import {useParams} from 'react-router-dom';
import styles from '../css/pages/MemberDetail.module.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import generateWebId from "../utils/generateWebId";
import { dummyData } from '../data/MemberData';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';

const MemberDetail = () => {
    const {id} = useParams();
    const [isEditing, setIsEditing] = React.useState(false);

    // const dummyData = [
    //     {
    //         type: '공공기관',
    //         org: '환경부',
    //         dept: '물관리국',
    //         phone: '02-1234-5678',
    //         name: '홍길동',
    //         wells: [{ region: '서울', name: '금호읍', location: '좌표', motorStatus: '정상', doorStatus: '정상', control: '가능' }]
    //     },
    //     {
    //         type: '기업',
    //         name: '이영희',
    //         phone: '010-2345-6789',
    //         org: '한결테크닉스',
    //         dept: '기술부',
    //         wells: [{ region: '부산', name: '청도면', location: '좌표', motorStatus: '정상', doorStatus: '정상', control: '가능' }]
    //     },
    //     {
    //         type: '개인',
    //         name: '김철수',
    //         phone: '010-3456-7890',
    //         org: '-',
    //         dept: '-',
    //         wells: [{ region: '경북', name: '동부동', location: '좌표', motorStatus: '정상', doorStatus: '정상', control: '가능' }]
    //     }
    // ].map((m, i) => ({ ...m, id: generateWebId(m, i) }));

    const [member, setMember] = React.useState(() => {
        const selected = dummyData.find(m => m.id === id);
        return selected || {wells: []};
    });

    const handleChange = (field, value) => {
        setMember(prev => ({...prev, [field]: value}));
    };

    const handleCancel = () => {
        const selected = dummyData.find(m => m.id === Number(id));
        setMember(selected || {wells: []});
        setIsEditing(false);
    };

    return (
        <div className={styles.layout}>
            <Sidebar/>
            <div className={styles.mainContent}>
                <Navbar title="회원 상세정보"/>

                <Box className={styles.editButtonBox}>
                    {isEditing ? (
                        <>
                            <Button onClick={handleCancel}>취소</Button>
                            <Button variant="contained" sx={{ml: 1}} onClick={() => setIsEditing(false)}>저장</Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={() => setIsEditing(true)}>수정</Button>
                    )}
                </Box>

                <Box className={styles.content}>
                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6">회원 정보</Typography>

                        {isEditing ? (
                            <TextField
                                select
                                label="회원구분"
                                fullWidth
                                value={member.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                                margin="dense"
                                SelectProps={{native: true}}
                            >
                                <option value="공공기관">공공기관</option>
                                <option value="기업">기업</option>
                                <option value="개인">개인</option>
                            </TextField>
                        ) : (
                            <TextField
                                label="회원구분"
                                fullWidth
                                value={member.type}
                                margin="dense"
                                InputProps={{readOnly: true}}
                            />
                        )}

                        <TextField
                            label="기관명"
                            fullWidth
                            value={member.org}
                            onChange={(e) => handleChange('org', e.target.value)}
                            InputProps={{readOnly: !isEditing}}
                            margin="dense"
                        />
                        <TextField
                            label="소속"
                            fullWidth
                            value={member.dept}
                            onChange={(e) => handleChange('dept', e.target.value)}
                            InputProps={{readOnly: !isEditing}}
                            margin="dense"
                        />
                        <TextField
                            label="전화번호"
                            fullWidth
                            value={member.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            InputProps={{readOnly: !isEditing}}
                            margin="dense"
                        />
                        <TextField
                            label="담당자명"
                            fullWidth
                            value={member.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            InputProps={{readOnly: !isEditing}}
                            margin="dense"
                        />
                    </Paper>

                    <Paper className={styles.fieldBox}>
                        <Typography variant="h6">관리 중인 지하수 관정</Typography>
                        <Table className={styles.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>지역</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>위치</TableCell>
                                    <TableCell>모터 상태</TableCell>
                                    <TableCell>도어 상태</TableCell>
                                    <TableCell>제어 스위치</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {member.wells && member.wells.map(well => (
                                    <TableRow key={well.no}>
                                        <TableCell>{well.no}</TableCell>
                                        <TableCell>{well.region}</TableCell>
                                        <TableCell>{well.name}</TableCell>
                                        <TableCell>{well.location}</TableCell>
                                        <TableCell>{well.motorStatus}</TableCell>
                                        <TableCell>{well.doorStatus}</TableCell>
                                        <TableCell>{well.control}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
            </div>
        </div>
    );
};

export default MemberDetail;