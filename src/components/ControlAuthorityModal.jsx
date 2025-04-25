import React, { useState } from 'react';
import {
    Modal, Box, Typography, IconButton, Button, TextField,
    RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './ControlAuthorityModal.module.css';

const dummyUsers = [
    { id: 1, name: '김유저', phone: '010-1234-5678' },
    { id: 2, name: '이관리자', phone: '010-2345-6789' },
    { id: 3, name: '박운영', phone: '010-3456-7890' },
];

const ControlAuthorityModal = ({ open, onClose, onSelect }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchKey, setSearchKey] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(dummyUsers);

    const handleSearch = () => {
        setFilteredUsers(dummyUsers.filter(
            u => u.name.includes(searchKey) || u.phone.includes(searchKey)
        ));
    };

    const handleSelect = () => {
        const selectedUser = dummyUsers.find(u => u.id === Number(selectedUserId));
        onSelect(selectedUser);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className={styles.modalBox}>
                <Box className={styles.modalHeader}>
                    <Typography variant="h6">제어 권한 사용자 선택</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Box>

                <Box display="flex" gap={1} mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="이름/전화번호"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSearch}>검색</Button>
                </Box>

                <RadioGroup value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                    {filteredUsers.map(user => (
                        <FormControlLabel
                            key={user.id}
                            value={user.id.toString()}
                            control={<Radio />}
                            label={`${user.name} (${user.phone})`}
                        />
                    ))}
                </RadioGroup>

                <Box className={styles.buttonArea}>
                    <Button onClick={onClose}>취소</Button>
                    <Button variant="contained" onClick={handleSelect} disabled={!selectedUserId}>선택</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ControlAuthorityModal;