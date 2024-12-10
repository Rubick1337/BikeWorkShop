import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import bikeReducer from './slice/bikeSlice';
import partReducer from './slice/partSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        bikes: bikeReducer,
        parts: partReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;