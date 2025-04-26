import React, {useMemo, useState} from 'react';
import {Box, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material';
import WellSearchFilter from './WellSearchFilter';
import styles from '../css/components/WellTable.module.css';
import ConfirmSwitchModal from '../components/ConfirmSwitchModal';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

const sampleData = [
    {
        id: 1,
        wellNumber: 'W-001',
        region: '서울특별시 강동구 천호동',
        name: '관정 A',
        location: '37.5665, 126.9780',
        motorStatus: '정상',
        doorStatus: '오류',
    },
    {
        id: 2,
        wellNumber: 'W-002',
        region: '서울특별시 강남구 역삼동',
        name: '관정 B',
        location: '37.5000, 127.0364',
        motorStatus: '오류',
        doorStatus: '정상',
    },
    // 추가 데이터...
];

const WellTable = () => {
    const [data, setData] = useState(sampleData);
    const [filters, setFilters] = useState({
        gbc: '',
        region: '',
        department: '',
        wellName: '',
    });
    const [open, setOpen] = useState(false);
    const [selectedSwitch, setSelectedSwitch] = useState(null);
    const [filteredWells, setFilteredWells] = useState(sampleData);

    const navigate = useNavigate();

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
        const result = sampleData.filter(m => {
            return (
                (!filters.id || m.type.includes(filters.id)) &&
                (!filters.name || m.name.includes(filters.name)) &&
                (!filters.region || m.region.includes(filters.region)) &&
                (!filters.wellNumber || m.wellNumber.includes(filters.wellNumber))
            );
        });
        setFilteredWells(result);
    };

    return (
        <Box className={styles.container}>
            <WellSearchFilter filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch}/>
            <div className={styles.actionButtons}>
                <Button variant="contained" color="primary" onClick={handleRegister}>
                    등록
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                    삭제
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>NO</TableCell>
                            <TableCell>관정넘버</TableCell>
                            <TableCell>지역</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>위치</TableCell>
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
                                <TableCell>{row.wellNumber}</TableCell>
                                <TableCell>{row.region}</TableCell>
                                <TableCell
                                    className={styles.clickable}
                                    onClick={() => navigate(`/wells/${row.id}`)}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.location}</TableCell>
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