import React, { useState } from 'react';
import styles from '../../css/pages/WellList.module.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UserNotiTable from '../components/UserNotiTable';

const UserNotiList = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                <Navbar title="알림 목록" />
                {/*<WellSearchFilter filters={filters} onChange={handleFilterChange} />*/}
                <UserNotiTable/>
            </div>
        </div>
    );
};

export default UserNotiList;
