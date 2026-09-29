import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import requestSlice from './requestSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        feed : feedReducer,
        request : requestSlice,
    }

})

export default store;