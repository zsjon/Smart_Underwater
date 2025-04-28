import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography, Grid, Select, MenuItem } from '@mui/material';
import Sidebar from "../components/Sidebar";
import styles from "../../css/pages/WellList.module.css";
import { Bolt } from '@mui/icons-material';

// 관정 데이터 (id 매핑 추가)
const wells = [
    { name: '관정 A', id: 1 },
    { name: '관정 B', id: 2 },
];

// 관정별 실시간 데이터
const dummyData = {
    1: { // 관정 A (id:1)
        groundwaterLevel: '3.2m',
        groundwaterTemp: '14.5°C',
        flowRate: '120L/min',
        groundwaterPH: '-',
        groundwaterEC: '-',
        nitrateNitrogen: '-',
        orp: '-',
        motorCurrentInput: '10A',
        motorCurrentSubmersible: '8A',
        motorVoltageInput: '220V',
        motorVoltageSubmersible: '215V',
        motorResistance: '5Ω',
        motorStatus: '정상',
        tankLevel: '2.8m',
        tankTemp: '15.2°C',
        tankEC: '-',
        tankNitrateNitrogen: '-',
        chlorineIon: '0.8mg/L',
        doorStatus: '열림',
        doorOperation: '정상',
    },
    2: { // 관정 B (id:2)
        groundwaterLevel: '3.8m',
        groundwaterTemp: '16.2°C',
        flowRate: '130L/min',
        groundwaterPH: '7.0',
        groundwaterEC: '0.5mS/cm',
        nitrateNitrogen: '2.0mg/L',
        orp: '150mV',
        motorCurrentInput: '11A',
        motorCurrentSubmersible: '9A',
        motorVoltageInput: '225V',
        motorVoltageSubmersible: '218V',
        motorResistance: '6Ω',
        motorStatus: '정상',
        tankLevel: '3.0m',
        tankTemp: '16.0°C',
        tankEC: '0.45mS/cm',
        tankNitrateNitrogen: '1.8mg/L',
        chlorineIon: '0.7mg/L',
        doorStatus: '닫힘',
        doorOperation: '정상',
    }
};

const groupedKeys = {
    groundwater: ['groundwaterLevel', 'groundwaterTemp', 'flowRate', 'groundwaterPH', 'groundwaterEC', 'nitrateNitrogen', 'orp'],
    motor: ['motorCurrentInput', 'motorCurrentSubmersible', 'motorVoltageInput', 'motorVoltageSubmersible', 'motorResistance', 'motorStatus'],
    tank: ['tankLevel', 'tankTemp', 'tankEC', 'tankNitrateNitrogen', 'chlorineIon'],
    door: ['doorStatus', 'doorOperation']
};

const labelMap = {
    groundwaterLevel: '지하수 수위',
    groundwaterTemp: '지하수 온도',
    flowRate: '유량',
    groundwaterPH: 'pH 값 (향후)',
    groundwaterEC: 'EC 값 (향후)',
    nitrateNitrogen: '질산성 질소 (향후)',
    orp: 'ORP (향후)',
    motorCurrentInput: '전류 (인입부)',
    motorCurrentSubmersible: '전류 (수중모터)',
    motorVoltageInput: '전압 (인입부)',
    motorVoltageSubmersible: '전압 (수중모터)',
    motorResistance: '저항 (수중모터)',
    motorStatus: '모터 정상작동',
    tankLevel: '물탱크 수위',
    tankTemp: '물탱크 수온',
    tankEC: '물탱크 EC값 (향후)',
    tankNitrateNitrogen: '물탱크 질산성 질소 (향후)',
    chlorineIon: '염소이온',
    doorStatus: '도어 계폐유무',
    doorOperation: '도어 정상유무',
};

const UserWellLive = () => {
    const navigate = useNavigate();
    const [selectedWellId, setSelectedWellId] = useState(1); // 초기 선택은 관정 A

    const liveData = dummyData[selectedWellId];

    const handleWellChange = (e) => {
        setSelectedWellId(e.target.value);
    };

    const handleValueClick = (itemKey) => {
        navigate(`/userWells/${selectedWellId}/statistics?item=${itemKey}`);
    };

    const renderGroup = (groupName, keys) => (
        <Box mt={5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                {groupName}
            </Typography>
            <Grid container spacing={3}>
                {keys.map(key => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <Card
                            onClick={() => handleValueClick(key)}   // <<<< 카드 전체에 클릭 이벤트
                            sx={{
                                height: '100%',
                                transition: '0.3s',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                borderRadius: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 3,
                                cursor: 'pointer',  // <<< 커서 포인터로 변경
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
                                    backgroundColor: '#fafafa',
                                },
                            }}
                        >
                            <Bolt color="primary" fontSize="large" />
                            <Typography variant="subtitle2" color="text.secondary" mt={1}>
                                {labelMap[key]}
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                mt={1}
                                sx={{ color: '#1976d2' }}
                            >
                                {liveData[key]}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                <Box p={4}>
                    <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2} mb={3}>
                        <Typography variant="h4" fontWeight="bold">
                            관정 실시간 데이터
                        </Typography>
                        <Select
                            value={selectedWellId}
                            onChange={handleWellChange}
                            size="small"
                            sx={{
                                minWidth: 200,
                                height: 45,
                                fontWeight: 'bold',
                                backgroundColor: 'white',
                                border: '2px solid #1976d2',
                                borderRadius: 2,
                                '& fieldset': { border: 'none' },
                                '& .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                },
                                '&:hover': {
                                    backgroundColor: '#f5faff',
                                }
                            }}
                        >
                            {wells.map((well) => (
                                <MenuItem key={well.id} value={well.id}>
                                    {well.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {/* 데이터 그룹별 출력 */}
                    {renderGroup('관정 데이터', groupedKeys.groundwater)}
                    {renderGroup('모터 데이터', groupedKeys.motor)}
                    {renderGroup('물탱크 데이터', groupedKeys.tank)}
                    {renderGroup('도어 데이터', groupedKeys.door)}
                </Box>
            </div>
        </div>
    );
};

export default UserWellLive;
