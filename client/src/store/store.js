import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modules/modalSlice';
// 리덕스 스토어 생성
export const store = configureStore({
  reducer: { modal: modalReducer },
});
