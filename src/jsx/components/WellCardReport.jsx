import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../css/components/WellCardReport.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const dummyWellData = {
    id: 'W-001',
    name: '삼릉공원 관정',
    location: '서울시 강동구 동남로',
    latitude: '37.5656',
    longitude: '126.9780',
    photo: 'https://via.placeholder.com/150',
    permitNumber: 'ABC-123',
    permitDate: '2023-05-12',
    contractor: '한결테크닉스'
};

const WellCardReport = () => {
    const { id } = useParams();
    const handlePrintPDF = async () => {
        const report = document.getElementById('report-content');
        const canvas = await html2canvas(report);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`지하수관리카드_${dummyWellData.id}.pdf`);
    };

    return (
        <div className={styles.container} id="report-content">
            <h2>지하수 관리 카드</h2>

            <div className={styles.infoSection}>
                <h3>기본 정보</h3>
                <p><strong>관정 번호:</strong> {dummyWellData.id}</p>
                <p><strong>관정명:</strong> {dummyWellData.name}</p>
                <p><strong>주소:</strong> {dummyWellData.location}</p>
                <p><strong>위도/경도:</strong> {dummyWellData.latitude}, {dummyWellData.longitude}</p>
                <p><strong>허가번호:</strong> {dummyWellData.permitNumber}</p>
                <p><strong>허가일:</strong> {dummyWellData.permitDate}</p>
                <p><strong>시공사:</strong> {dummyWellData.contractor}</p>
                {/*<img src={dummyWellData.photo} alt="관정 사진" className={styles.photo} />*/}
            </div>

            <form className={styles.form}>
                <div className={styles.fieldGroup}>
                    <label>기타 내용</label>
                    <textarea placeholder="입력해주세요..." />
                </div>
                <button type="button" onClick={handlePrintPDF}>PDF 출력</button>
            </form>
        </div>
    );
};

export default WellCardReport;