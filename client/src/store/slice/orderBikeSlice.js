import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderBikeService from '../../service/BikeOrderService';

// Асинхронный экшен для создания нового заказа велосипеда
export const createOrderBike = createAsyncThunk(
    'orderBike/createOrderBike',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await OrderBikeService.createOrder(orderData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный экшен для получения всех заказов велосипедов
export const fetchOrderBikes = createAsyncThunk(
    'orderBike/fetchOrderBikes',
    async (params, { rejectWithValue }) => {
        try {
            const response = await OrderBikeService.getOrders(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный экшен для получения конкретного заказа велосипеда
export const fetchOrderBike = createAsyncThunk(
    'orderBike/fetchOrderBike',
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderBikeService.getOrder(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteOrderBike = createAsyncThunk(
    'orderBike/deleteOrderBike',
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderBikeService.deleteOrder(id);
            return id;  // Возвращаем id для удаления из состояния
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const orderBikeSlice = createSlice({
    name: 'orderBike',
    initialState: {
        orders: [],
        order: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrderBike.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderBike.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(createOrderBike.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOrderBikes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderBikes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrderBikes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOrderBike.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderBike.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.order = action.payload;
            })
            .addCase(fetchOrderBike.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteOrderBike.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteOrderBike.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = state.orders.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrderBike.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default orderBikeSlice.reducer;
