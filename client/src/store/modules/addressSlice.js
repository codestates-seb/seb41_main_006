import { createSlice } from '@reduxjs/toolkit';

/*---------- 초기 상태 선언 ----------*/
const initialState = {
  code: '1159010700',
  address: '서울특별시 동작구 사당동',
};

/*---------- slice 생성 ----------*/
export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    /** modal open */
    setAddress: (state, action) => {
      const { code, address } = action.payload;
      state.code = code;
      state.address = address;
    },
    /** modal close */
    resetAddress: () => {
      return initialState;
    },
  },
});

/*---------- 액션 생성 함수 ----------*/
export const { setAddress, resetAddress } = addressSlice.actions;

/*---------- Slice의 Reducer를 export ----------*/
export default addressSlice.reducer;
