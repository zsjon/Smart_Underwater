import React from 'react';
import styles from '../css/components/MemberSearchFilter.module.css';
import { TextField, Button, MenuItem } from '@mui/material';

const MemberSearchFilter = ({ filters, onChange, onSearch }) => {
    return (
        <div className={styles.filterContainer}>
            <TextField
                select
                label="발주처구분(GBC)"
                name="gbc"
                value={filters.gbc}
                onChange={onChange}
                variant="outlined"
                size="small"
                className={styles.filterField}
                SelectProps={{ displayEmpty: true }}
            >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value="공공">공공기관</MenuItem>
                <MenuItem value="기업">기업</MenuItem>
                <MenuItem value="개인">개인</MenuItem>
            </TextField>
            <TextField
                name="region"
                value={filters.region}
                onChange={onChange}
                label="지역(시/구/동)"
                variant="outlined"
                size="small"
                className={styles.filterField}
            />
            <TextField
                name="dept"
                value={filters.dept}
                onChange={onChange}
                label="담당부서"
                variant="outlined"
                size="small"
                className={styles.filterField}
            />
            <TextField
                name="name"
                value={filters.name}
                onChange={onChange}
                label="이름"
                variant="outlined"
                size="small"
                className={styles.filterField}
            />
            <Button variant="contained" color="primary" onClick={onSearch}>
                검색
            </Button>
        </div>
    );
};

export default MemberSearchFilter;