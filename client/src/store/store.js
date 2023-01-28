import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modules/modalSlice';
import addressReducer from './modules/addressSlice';
// 리덕스 스토어 생성
export const store = configureStore({
  reducer: { modal: modalReducer, address: addressReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
