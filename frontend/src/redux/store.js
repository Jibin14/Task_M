import {configureStore} from '@reduxjs/toolkit';
import productReducer from './productSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer:{
        productState:productReducer,
        userState:userReducer

    }
});
export default store;