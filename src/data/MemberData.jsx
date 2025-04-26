import generateWebId from '../utils/generateWebId';

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
        name: '김철수',
        phone: '010-3456-7890',
        org: '-',
        dept: '-',
        wells: [{ no: 3, region: '경북', name: '동부동', location: '좌표', motorStatus: '정상', doorStatus: '정상', control: '가능' }]
    }
];

export const dummyData = rawMembers.map((member, index) => ({
    ...member,
    id: generateWebId(member, index)
}));