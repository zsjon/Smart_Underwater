import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import WellSearchFilter from './WellSearchFilter';
import styles from '../../css/components/WellTable.module.css';
import ConfirmSwitchModal from './ConfirmSwitchModal';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

const AdminWellTable = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        gbc: '',
        region: '',
        department: '',
        wellName: '',
    });
    const [open, setOpen] = useState(false);
    const [selectedSwitch, setSelectedSwitch] = useState(null);

    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

    const fetchWellList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/wells/list`);
            setData(response.data);
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
        }
    };

    useEffect(() => {
        fetchWellList();
    }, []);

    const handleRegister = () => {
        navigate('/wells/register');
    };

    const handleDelete = () => {
        alert('선택한 항목을 삭제하는 기능은 아직 구현되지 않았습니다.');
    };

    const handleOpenModal = (rowId, type, currentState) => {
        setSelectedSwitch({ rowId, type, newValue: !currentState });
        setOpen(true);
    };

    const handleSwitchConfirm = async () => {
        if (!selectedSwitch) return;
        const { rowId, type, newValue } = selectedSwitch;

        try {
            const endpoint = type === 'isMotorActive' ? 'motor' : 'door';
            const paramKey = type === 'isMotorActive' ? 'run' : 'open';
            await axios.post(`${API_BASE_URL}/wells/list/${rowId}/${endpoint}?${paramKey}=${newValue}`);
            await fetchWellList();
        } catch (error) {
            console.error('제어 요청 실패:', error);
        } finally {
            setOpen(false);
            setSelectedSwitch(null);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesGBC = filters.gbc ? item.gbc?.includes(filters.gbc) : true;
            const matchesRegion = filters.region
                ? `${item.areaSiDoName} ${item.areaSiGunGuName} ${item.areaEupMyeonRiName}`.includes(filters.region)
                : true;
            const matchesDepartment = filters.department ? item.department?.includes(filters.department) : true;
            const matchesWellName = filters.wellName ? item.name.includes(filters.wellName) : true;
            return matchesGBC && matchesRegion && matchesDepartment && matchesWellName;
        });
    }, [data, filters]);

    return (
        <Box className={styles.container}>
            <WellSearchFilter filters={filters} onFilterChange={handleFilterChange} />
            <div className={styles.actionButtons}>
                <Button variant="contained" color="primary" onClick={handleRegister}>등록</Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>삭제</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>NO</TableCell>
                            <TableCell>관정넘버</TableCell>
                            <TableCell>지역</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>위도 / 경도</TableCell>
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
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{`${row.areaSiDoName} ${row.areaSiGunGuName} ${row.areaEupMyeonRiName}`}</TableCell>
                                <TableCell
                                    className={styles.clickable}
                                    onClick={() => navigate(`/adminWells/${row.id}`)}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell>{`${row.lat ?? '-'}, ${row.lng ?? '-'}`}</TableCell>
                                <TableCell>{row.isMotorActive ? '정상' : '오류'}</TableCell>
                                <TableCell>{row.isDoorActive ? '정상' : '오류'}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.isMotorActive}
                                        onChange={() => handleOpenModal(row.id, 'isMotorActive', row.isMotorActive)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.isDoorActive}
                                        onChange={() => handleOpenModal(row.id, 'isDoorActive', row.isDoorActive)}
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
                onClose={() => {
                    setOpen(false);
                    setSelectedSwitch(null);
                }}
                onConfirm={handleSwitchConfirm}
            />
        </Box>
    );
};

export default AdminWellTable;