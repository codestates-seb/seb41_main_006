// 모임 글 상세 페이지 날짜 형식 (YYYY.MM.DD HH:MM)
export const convertCreatedAt = (createAt) => {
  const utcDate = new Date(createAt);

  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const date = String(utcDate.getDate()).padStart(2, '0');
  const hour = String(utcDate.getHours()).padStart(2, '0');
  const min = String(utcDate.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${date} ${hour}:${min}`;
};

// 모임 찾기 페이지 날짜 형식 (YYYY.MM.DD (DAY) 오전/오후 H시 MM분)
export const convertAppointDate = (appointTime) => {
  const utcDate = new Date(appointTime);

  const weekday = ['일', '월', '화', '수', '목', '금', '토'];

  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const date = String(utcDate.getDate()).padStart(2, '0');
  const day = weekday[utcDate.getDay()];
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();

  const time = `${hours <= 12 ? `오전 ${hours}시` : `오후 ${hours - 12}시`} ${
    minutes === 0 ? '' : `${minutes}분`
  }`;

  return `${year}.${month}.${date} (${day}) ${time}`;
};

export const convertAppointTime = (appointTime) => {
  const utcDate = new Date(appointTime);
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();

  const time = `${hours <= 12 ? `오전 ${hours}시` : `오후 ${hours - 12}시`} ${
    minutes === 0 ? '' : `${minutes}분`
  }`;
  return time;
};
