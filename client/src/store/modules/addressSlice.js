import { createSlice } from '@reduxjs/toolkit';

/*---------- 초기 상태 선언 ----------*/
const initialState = {
  code: '',
  address: '',
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
