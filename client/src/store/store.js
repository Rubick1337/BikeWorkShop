import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import bikeReducer from './slice/bikeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        bikes: bikeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;