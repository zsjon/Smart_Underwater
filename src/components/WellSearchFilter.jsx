// components/WellsFilter.jsx
import React from 'react';
import { Box, TextField } from '@mui/material';
import styles from './WellSearchFilter.module.css';

const WellsFilter = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        onFilterChange({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Box className={styles.filterContainer}>
            <TextField
                label="발주처구분(GBC)"
                name="gbc"
                value={filters.gbc}
                onChange={handleChange}
                variant="outlined"
                size="small"
                className={styles.filterField}
            />
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
        </Box>
    );
}
export default WellsFilter;