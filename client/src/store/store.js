import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import bikeReducer from './slice/bikeSlice';
import partReducer from './slice/partSlice';
import serviceReducer from './slice/serviceSlice';
import basketReducer from './slice/basketSlice';
import orderBikeReducer from './slice/orderBikeSlice';
import orderPartSlice from "./slice/orderPartSlice";
import orderServiceSlice from "./slice/orderServiceSlice";
import usersReducer from './slice/usersSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        bikes: bikeReducer,
        parts: partReducer,
        services: serviceReducer,
        baskets: basketReducer,
        orderBike: orderBikeReducer,
        orderPart:orderPartSlice,
        orderService: orderServiceSlice,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;