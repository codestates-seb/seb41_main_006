import Swal from 'sweetalert2';

export const alertLogin = () => {
  Swal.fire({
    icon: 'error',
    text: '로그인 후 이용해 주세요.',
  });
};

export const tryAgain = () => {
  Swal.fire({
    icon: 'warning',
    text: '다시 시도해 주세요.',
  });
};

export const wrongInput = () => {
  Swal.fire({
    icon: 'warning',
    text: '이메일과 비밀번호를 정확히 입력해 주세요.',
  });
};
