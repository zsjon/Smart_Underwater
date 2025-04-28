import React, { useMemo, useState } from 'react';
import { Box, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import WellSearchFilter from './WellSearchFilter';
import styles from '../../css/components/WellTable.module.css';
import ConfirmSwitchModal from './ConfirmSwitchModal';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { WellDummyData } from '../../data/WellData';

const WellTable = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const [data, setData] = useState(WellDummyData);
    const [filters, setFilters] = useState({
        gbc: '',
        region: '',
        department: '',
        wellName: '',
    });
    const [open, setOpen] = useState(false);
    const [selectedSwitch, setSelectedSwitch] = useState(null);

    const handleRegister = () => {
        navigate('/wells/register');
    };

    const handleDelete = () => {
        alert('선택한 항목을 삭제하는 기능은 아직 구현되지 않았습니다.');
    };

    const handleOpenModal = (rowId, type) => {
        setSelectedSwitch({ rowId, type });
        setOpen(true);
    };

    const handleSwitchConfirm = () => {
        if (!selectedSwitch) return;
        const { rowId, type } = selectedSwitch;
        const newData = data.map(item =>
            item.id === rowId
                ? { ...item, [type]: item[type] === '정상' ? '오류' : '정상' }
                : item
        );
        setData(newData);
        setOpen(false);
        setSelectedSwitch(null);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesGBC = filters.gbc ? item.gbc?.includes(filters.gbc) : true;
            const matchesRegion = filters.region ? item.region.includes(filters.region) : true;
            const matchesDepartment = filters.department ? item.department?.includes(filters.department) : true;
            const matchesWellName = filters.wellName ? item.name.includes(filters.wellName) : true;
            return matchesGBC && matchesRegion && matchesDepartment && matchesWellName;
        });
    }, [data, filters]);

    const handleSearch = () => {
        const result = WellDummyData.filter(m => {
            return (
                (!filters.gbc || m.gbc?.includes(filters.gbc)) &&
                (!filters.region || m.region.includes(filters.region)) &&
                (!filters.department || m.department?.includes(filters.department)) &&
                (!filters.wellName || m.name.includes(filters.wellName))
            );
        });
        setData(result);
    };

    return (
        <Box className={styles.container}>
            {role === 'admin' && (
                <WellSearchFilter filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />
            )}
            {role === 'admin' && (
                <div className={styles.actionButtons}>
                    <Button variant="contained" color="primary" onClick={handleRegister}>
                        등록
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>
                        삭제
                    </Button>
                </div>
            )}
            <TableContainer component={Paper}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>NO</TableCell>
                            {role === 'admin' && <TableCell>관정넘버</TableCell>}
                            <TableCell>{role === 'admin' ? '지역' : '주소'}</TableCell>
                            <TableCell>{role === 'admin' ? '이름' : '관정명'}</TableCell>
                            {role === 'admin' && <TableCell>위치</TableCell>}
                            <TableCell>모터 상태</TableCell>
                            <TableCell>도어 상태</TableCell>
                            <TableCell>모터 제어</TableCell>
                            <TableCell>도어 제어</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                {role === 'admin' && <TableCell>{row.wellNumber}</TableCell>}
                                <TableCell>{row.region}</TableCell>
                                <TableCell
                                    className={styles.clickable}
                                    onClick={() => navigate(`/wells/${row.id}`)}
                                >
                                    {row.name}
                                </TableCell>
                                {role === 'admin' && <TableCell>{row.location}</TableCell>}
                                <TableCell>{row.motorStatus}</TableCell>
                                <TableCell>{row.doorStatus}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.motorStatus === '정상'}
                                        onChange={() => handleOpenModal(row.id, 'motorStatus')}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.doorStatus === '정상'}
                                        onChange={() => handleOpenModal(row.id, 'doorStatus')}
                                        color="primary"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmSwitchModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleSwitchConfirm}
            />
        </Box>
    );
};

export default WellTable;