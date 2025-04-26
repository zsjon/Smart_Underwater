import React from 'react';
import styles from '../css/components/MemberTable.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {useNavigate} from "react-router-dom";

const MemberTable = ({ members }) => {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} className={styles.tableWrapper}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>회원구분</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>전화번호</TableCell>
                        <TableCell>기관명 / 사업자명</TableCell>
                        <TableCell>담당자 / 부서</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{member.type}</TableCell>
                            <TableCell
                                className={styles.clickable}
                                onClick={() => navigate(`/users/${member.id}`)}
                            >
                                {member.name}
                            </TableCell>
                            <TableCell>{member.phone}</TableCell>
                            <TableCell>{member.org}</TableCell>
                            <TableCell>{member.dept}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MemberTable;