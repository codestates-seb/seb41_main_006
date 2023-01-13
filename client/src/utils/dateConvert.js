// 모임 글 상세 페이지 날짜 형식 (YYYY.MM.DD HH:MM)
export const MatePostDate = (createAt) => {
  const utcDate = new Date(createAt);
  console.log(utcDate);

  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const date = String(utcDate.getDate()).padStart(2, '0');
  const hour = String(utcDate.getHours()).padStart(2, '0');
  const min = String(utcDate.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${date} ${hour}:${min}`;
};

// 모임 찾기 페이지 날짜 형식 (YYYY.MM.DD (DAY))
export const FindMateDate = (createAt) => {
  const utcDate = new Date(createAt);

  const weekday = ['일', '월', '화', '수', '목', '금', '토'];

  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const date = String(utcDate.getDate()).padStart(2, '0');
  const day = weekday[utcDate.getDay()];

  return `${year}.${month}.${date} (${day})`;
};
