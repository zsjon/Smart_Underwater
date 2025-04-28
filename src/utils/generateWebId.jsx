const generateWebId = (member, index) => {
    const typeMap = {
        '공공기관': 'G1',
        '기업': 'B1',
        '개인': 'C'
    };

    const orgMap = {
        '환경부': 'A',
        '한결테크닉스': 'B',
        '-': 'Z'
    };

    const regionMap = {
        '서울': '02',
        '부산': '51',
        '대구': '53',
        '경기': '31',
        '경북': '54'
    };

    const cityMap = {
        '영천시': 'F',
        '구미시': 'E',
        '영천': 'F',
        '서울': 'A',
        '부산': 'B'
    };

    const areaMap = {
        '금호읍': 'A',
        '청도면': 'B',
        '동부동': 'L',
        '중앙동': 'M',
        '서부동': 'N'
    };

    const installOrder = String(index + 1).padStart(2, '0');

    const typeCode = typeMap[member.type] || 'X';
    const orgCode = orgMap[member.org] || 'Z';
    const regionCode = regionMap[member.wells[0]?.region] || '99';
    const cityCode = cityMap[member.wells[0]?.region] || 'X';
    const areaCode = areaMap[member.wells[0]?.name] || 'Z';

    return `${typeCode}${orgCode}${regionCode}${cityCode}${areaCode}${installOrder}`;
};

export default generateWebId;