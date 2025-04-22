import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import GoogleMapReact from 'google-map-react';
import styles from './Dashboard.module.css';

const getMarkerColor = (status) => {
    switch (status) {
        case '정상': return 'green';
        case '오류': return 'red';
        case '모터 정지': return 'orange';
        case '유지보수 요청': return 'blue';
        default: return 'gray';
    }
};

const Marker = ({ status }) => (
    <div style={{
        width: 12,
        height: 12,
        backgroundColor: getMarkerColor(status),
        borderRadius: '50%',
        border: '2px solid white',
        boxShadow: '0 0 5px rgba(0,0,0,0.3)'
    }} title={status}></div>
);

const Dashboard = () => {
    const [statistics] = useState({ total: 12, open: 3, error: 2 });
    const [locations] = useState([
        { id: 1, lat: 37.5665, lng: 126.9780, status: '정상', name: '관정 A' },
        { id: 2, lat: 37.5755, lng: 126.9950, status: '오류', name: '관정 B' },
        { id: 3, lat: 37.5600, lng: 126.9700, status: '유지보수 요청', name: '관정 C' },
    ]);

    return (
        <Box className={styles.container}>
            <Sidebar />
            <Box className={styles.main}>
                <Navbar />
                <Box className={styles.content}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper className={styles.statsCard}>
                                <Typography variant="h6">지하수 통계</Typography>
                                <Typography>총 관정: {statistics.total}</Typography>
                                <Typography>열림: {statistics.open}</Typography>
                                <Typography>이상: {statistics.error}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper className={styles.mapCard}>
                                {/*<GoogleMapReact*/}
                                {/*    bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }}*/}
                                {/*    defaultCenter={{ lat: 37.5665, lng: 126.9780 }}*/}
                                {/*    defaultZoom={12}*/}
                                {/*>*/}
                                {/*    {locations.map(loc => (*/}
                                {/*        <Marker*/}
                                {/*            key={loc.id}*/}
                                {/*            lat={loc.lat}*/}
                                {/*            lng={loc.lng}*/}
                                {/*            status={loc.status}*/}
                                {/*        />*/}
                                {/*    ))}*/}
                                {/*</GoogleMapReact>*/}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;