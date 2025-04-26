// components/WellsFilter.jsx
import React from 'react';
import {Box, Button, MenuItem, TextField} from '@mui/material';
import styles from '../css/components/WellSearchFilter.module.css';

const WellsFilter = ({ filters, onFilterChange, onSearch }) => {
    const handleChange = (e) => {
        onFilterChange({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Box className={styles.filterContainer}>
            <TextField
                select
                label="발주처구분(GBC)"
                name="gbc"
                value={filters.gbc}
                onChange={handleChange}
                variant="outlined"
                size="small"
                className={styles.filterField}
                SelectProps={{ native: true }}
            >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value="공공">공공기관</MenuItem>
                <MenuItem value="기업">기업</MenuItem>
                <MenuItem value="개인">개인</MenuItem>
            </TextField>
            <TextField
                label="지역(시/구/동)"
                name="region"
                value={filters.region}
                onChange={handleChange}
                variant="outlined"
                size="small"
                className={styles.filterField}
            />
            <TextField
                label="발주처구분(담당부서)"
                name="department"
                value={filters.department}
                onChange={handleChange}
                variant="outlined"
                size="small"
                className={styles.filterField}
            />
            <TextField
                label="관정명"
                name="wellName"
                value={filters.wellName}
                onChange={handleChange}
                variant="outlined"
                size="small"
                className={styles.filterField}
            />
            <Button variant="contained" color="primary" onClick={onSearch}>
                검색
            </Button>
        </Box>
    );
}
export default WellsFilter;