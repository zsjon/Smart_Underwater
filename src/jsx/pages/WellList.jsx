import React, { useState } from 'react';
import styles from '../../css/pages/WellList.module.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import WellTable from '../components/WellTable';

const WellList = () => {
    const [filters, setFilters] = useState({
        gbType: '',
        region: '',
        department: '',
        name: ''
    });

    const [wells] = useState([
        {
            no: 1,
            number: 'W-001',
            region: '서울 강남구',
            name: '강남관정',
            location: '37.5, 127.0',
            motorStatus: '정상',
            doorStatus: '열림',
            switch: 'OFF'
        },
    ]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredWells = wells.filter((well) => {
        return (
            well.region.includes(filters.region) &&
            well.name.includes(filters.name)
        );
    });

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                <Navbar title="관정 목록" />
                {/*<WellSearchFilter filters={filters} onChange={handleFilterChange} />*/}
                <WellTable wells={filteredWells} />
            </div>
        </div>
    );
};

export default WellList;