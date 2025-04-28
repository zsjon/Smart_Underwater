export const userMenu = [
    { label: '대시보드', path: '/dashboard' },
    { label: '지하수 관정', path: '/wells' },
    //     children: [
    //         { label: '지하수 목록', path: '/wells' },
    //         { label: '상세 페이지', path: '/wells/detail' },
    //     ],
    // },
    {
        label: '실시간 데이터',
        children: [
            { label: '목록', path: '/realtime' },
            { label: '통계', path: '/realtime/stats' },
        ],
    },
    {
        label: '알림',
        children: [
            { label: '목록', path: '/alerts' },
            { label: '상세', path: '/alerts/detail' },
        ],
    },
    {
        label: '고객센터',
        children: [
            { label: '공지사항', path: '/support/notice' },
            { label: 'FAQ', path: '/support/faq' },
            { label: '유지보수', path: '/support/maintenance' },
        ],
    },
    { label: '내정보', path: '/profile' },
];

export const adminMenu = [
    { label: '대시보드', path: '/dashboard' },
    { label: '회원관리', path: '/users' },
    {
        label: '관정(원격제어 포함)',
        children: [
            { label: '목록', path: '/wells' },
            { label: '보고서', path: '/wells/report' }
        ],
    },
    {
        label: '알림',
        children: [
            { label: '목록', path: '/alerts' },
            { label: '상세', path: '/alerts/detail' },
        ],
    },
    {
        label: '고객센터',
        children: [
            { label: '공지사항', path: '/support/notice' },
            { label: 'FAQ', path: '/support/faq' },
            { label: '유지보수', path: '/support/maintenance' },
        ],
    },
    {
        label: '운영관리',
        children: [
            { label: '관리자 계정관리', path: '/admin/accounts' },
            { label: '지역코드관리', path: '/admin/regions' },
            { label: '발주처 관리', path: '/admin/orders' },
        ],
    },
];