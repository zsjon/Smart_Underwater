import React, {useState} from 'react';
import MemberSearchFilter from '../components/MemberSearchFilter';
import MemberTable from '../components/MemberTable';
import styles from '../css/pages/MemberList.module.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import generateWebId from "../utils/generateWebId";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const rawMembers = [
    {
        type: '공공기관',
        name: '홍길동',
        phone: '010-1234-5678',
        org: '환경부',
        dept: '물관리국',
        wells: [{ no: 1, region: '서울', name: '금호읍', location: '좌표', motorStatus: '정상', doorStatus: '정상', control: '가능' }]
    },
    {
        type: '기업',
        name: '이영희',
        phone: '010-2345-6789',
        org: '한결테크닉스',
        dept: '기술부',
        wells: [{ no: 2, region: '부산', name: '청도면', location: '좌표', motorStatus: '정상', doorStatus: '정상', control: '가능' }]
    },
    {
        type: '개인',
        name: '홍길동',
        phone: '010-3456-7890',
        org: '-',
        dept: '-',
        wells: [{ no: 3, region: '경북', name: '동부동', location: '좌표', motorStatus: '정상', doorStatus: '정상', control: '가능' }]
    }
];

const dummyData = rawMembers.map((member, index) => ({
    ...member,
    id: generateWebId(member, index)
}));

const MemberList = () => {
    const [filters, setFilters] = useState({gbc: '', region: '', dept: '', name: '', phone: ''});
    const [filteredMembers, setFilteredMembers] = useState(dummyData);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    const handleSearch = () => {
        const result = dummyData.filter(m => {
            return (
                (!filters.gbc || m.type.includes(filters.gbc)) &&
                (!filters.name || m.name.includes(filters.name)) &&
                (!filters.phone || m.phone.includes(filters.phone))
            );
        });
        setFilteredMembers(result);
    };

    const handleRegister = () => {
        navigate('/users/newmember');
    };

    const handleDelete = () => {
        alert('선택한 항목을 삭제하는 기능은 아직 구현되지 않았습니다.');
    };

    return (
        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.main}>
                <Navbar title='회원 관리'/>
                <MemberSearchFilter filters={filters} onChange={handleChange} onSearch={handleSearch}/>
                <div className={styles.actionButtons}>
                    <Button variant="contained" color="primary" onClick={handleRegister}>
                        등록
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>
                        삭제
                    </Button>
                </div>
                <MemberTable members={filteredMembers}/>
            </div>
        </div>
    );
};

export default MemberList;