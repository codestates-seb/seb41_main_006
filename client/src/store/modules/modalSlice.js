import { createSlice } from '@reduxjs/toolkit';

/*---------- 초기 상태 선언 ----------*/
const initialState = {
  type: '', // 오픈할 모달을 지정할 타입
  props: {}, // 오픈한 모달에 전달할 props
};

/*---------- slice 생성 ----------*/
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    /** modal open */
    openModal: (state, action) => {
      const { type, props } = action.payload;
      state.type = type;
      state.props = props;
    },
    /** modal close */
    closeModal: () => {
      return initialState;
    },
  },
});

/*---------- 액션 생성 함수 ----------*/
export const { openModal, closeModal } = modalSlice.actions;

/*---------- Slice의 Reducer를 export ----------*/
export default modalSlice.reducer;
