import React from 'react';
import {useParams} from 'react-router-dom';
import styles from '../../css/pages/MemberDetail.module.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { dummyData } from '../../data/MemberData';
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