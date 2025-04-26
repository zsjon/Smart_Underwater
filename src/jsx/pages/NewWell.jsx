import React, {useState} from 'react';
import styles from '../../css/pages/NewWell.module.css';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ControlAuthorityModal from '../components/ControlAuthorityModal';
import {useNavigate} from 'react-router-dom';

const NewWell = () => {
    const [authorityModalOpen, setAuthorityModalOpen] = useState(false);
    const [authorityUsers, setAuthorityUsers] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState('');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        wellId: '',
        name: '',
        address: '',
        lat: '',
        lng: '',
        siteImage: '',
        permitNumber: '',
        permitDate: '',
        contractor: '',
        powerUnit: '',
        depth: '',
        diameter: '',
        outlet: '',
        motorDepth: '',
        extraEquip: '',
        purpose: '',
        yield: '',
        intake: '',
        quality: '',
        cctvUrl: '',
        cctvAccount: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleAddAuthorityUser = (user) => {
        setAuthorityUsers(prev => [...prev, {...user, motor: false, door: false}]);
    };

    const handleAuthorityToggle = (index, key) => {
        const updated = [...authorityUsers];
        updated[index][key] = !updated[index][key];
        setAuthorityUsers(updated);
    };

    const handleDeleteUser = (index) => {
        const updated = [...authorityUsers];
        updated.splice(index, 1);
        setAuthorityUsers(updated);
    };

    const handleSubmit = () => {
        const isEmpty = Object.values(form).some(val => val.trim() === '') || authorityUsers.length === 0;
        if (isEmpty) {
            alert('모든 정보를 입력해 주세요.');
            return;
        }
        alert('등록되었습니다.');
        navigate('/wells');
    };

    return (
        <div className={styles.container}>
            <Sidebar/>
            <Box className={styles.main}>
                <Navbar title="신규 관정 등록"/>
                <Paper className={styles.paper}>
                    <Typography variant="h6">위치 및 기본 정보</Typography>
                    <Divider sx={{my: 2}}/>
                    <div className={styles.formGrid}>
                        <TextField name="wellId" label="관정넘버" value={form.wellId} onChange={handleChange}/>
                        <TextField name="name" label="이름" value={form.name} onChange={handleChange}/>
                        <TextField name="address" label="주소" value={form.address} onChange={handleChange}/>
                        <TextField name="lat" label="위도" value={form.lat} onChange={handleChange}/>
                        <TextField name="lng" label="경도" value={form.lng} onChange={handleChange}/>
                        <Button variant="outlined" component="label">
                            현장 사진 업로드
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setSelectedFileName(e.target.files[0].name);
                                    }
                                }}
                            />
                        </Button>
                        {selectedFileName && (
                            <Typography variant="body2" sx={{marginTop: 1}}>
                                선택된 파일: {selectedFileName}
                            </Typography>
                        )}
                        <TextField name="permitNumber" label="허가번호" value={form.permitNumber} onChange={handleChange}/>
                        <TextField name="permitDate" label="허가일" type="date" InputLabelProps={{shrink: true}}
                                   value={form.permitDate} onChange={handleChange}/>
                        <TextField name="contractor" label="시공사" value={form.contractor} onChange={handleChange}/>
                    </div>

                    <Typography variant="h6" sx={{mt: 4}}>지하수 시설 및 구조 정보</Typography>
                    <Divider sx={{my: 2}}/>
                    <div className={styles.formGrid}>
                        <TextField name="powerUnit" label="동력장치 정보" value={form.powerUnit} onChange={handleChange}/>
                        <TextField name="depth" label="굴착 깊이" value={form.depth} onChange={handleChange}/>
                        <TextField name="diameter" label="굴착 지름" value={form.diameter} onChange={handleChange}/>
                        <TextField name="outlet" label="토출관 지름" value={form.outlet} onChange={handleChange}/>
                        <TextField name="motorDepth" label="모터 설치 깊이" value={form.motorDepth} onChange={handleChange}/>
                        <TextField name="extraEquip" label="부가장치 정보" value={form.extraEquip} onChange={handleChange}/>
                    </div>

                    <Typography variant="h6" sx={{mt: 4}}>용도 및 운영 정보</Typography>
                    <Divider sx={{my: 2}}/>
                    <div className={styles.formGrid}>
                        <TextField name="purpose" label="용도" value={form.purpose} onChange={handleChange}/>
                        <TextField name="yield" label="양수능력" value={form.yield} onChange={handleChange}/>
                        <TextField name="intake" label="취수능력" value={form.intake} onChange={handleChange}/>
                        <TextField name="quality" label="수질정보" value={form.quality} onChange={handleChange}/>
                    </div>

                    <Typography variant="h6" sx={{mt: 4}}>CCTV 정보</Typography>
                    <Divider sx={{my: 2}}/>
                    <div className={styles.formGrid}>
                        <TextField name="cctvUrl" label="CCTV 링크 주소" value={form.cctvUrl} onChange={handleChange}/>
                        <TextField name="cctvAccount" label="CCTV 계정 정보" value={form.cctvAccount}
                                   onChange={handleChange}/>
                    </div>

                    <Typography variant="h6" sx={{mt: 4}}>제어 권한</Typography>
                    <Divider sx={{my: 2}}/>
                    <Box display="flex" justifyContent="flex-end" mb={1}>
                        <Button variant="outlined" onClick={() => setAuthorityModalOpen(true)}>
                            + 사용자 추가
                        </Button>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>모터 제어</TableCell>
                                    <TableCell>도어 제어</TableCell>
                                    <TableCell>삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {authorityUsers.map((user, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={user.motor}
                                                onChange={() => handleAuthorityToggle(idx, 'motor')}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={user.door}
                                                onChange={() => handleAuthorityToggle(idx, 'door')}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDeleteUser(idx)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <ControlAuthorityModal
                        open={authorityModalOpen}
                        onClose={() => setAuthorityModalOpen(false)}
                        onSelect={(user) => handleAddAuthorityUser(user)}
                    />
                    <div className={styles.buttonArea}>
                        <Button variant="outlined" onClick={() => navigate('/wells')}>
                            취소
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ml: 2}}>
                            등록
                        </Button>
                    </div>
                </Paper>
            </Box>
        </div>
    );
};

export default NewWell;