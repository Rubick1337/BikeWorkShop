import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderServiceService from '../../service/ServiceOrderService';

// Асинхронный экшен для создания нового заказа услуги
export const createOrderService = createAsyncThunk(
    'orderService/createOrderService',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await OrderServiceService.createOrderService(orderData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный экшен для получения всех заказов услуг
export const fetchOrderServices = createAsyncThunk(
    'orderService/fetchOrderServices',
    async (params, { rejectWithValue }) => {
        try {
            const response = await OrderServiceService.getOrderServices(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный экшен для получения конкретного заказа услуги
export const fetchOrderService = createAsyncThunk(
    'orderService/fetchOrderService',
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderServiceService.getOrderService(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteOrderService = createAsyncThunk(
    'orderService/deleteOrderService',
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderServiceService.deleteOrderService(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const orderServiceSlice = createSlice({
    name: 'orderService',
    initialState: {
        orders: [],
        order: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrderService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(createOrderService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOrderServices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderServices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrderServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOrderService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.order = action.payload;
            })
            .addCase(fetchOrderService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteOrderService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteOrderService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = state.orders.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrderService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default orderServiceSlice.reducer;
