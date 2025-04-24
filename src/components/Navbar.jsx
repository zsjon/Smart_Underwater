import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">Monitoring Dashboard</Typography>
            {/* 사용자 정보 및 알림 아이콘 등 */}
        </Toolbar>
    </AppBar>
);

export default Navbar;