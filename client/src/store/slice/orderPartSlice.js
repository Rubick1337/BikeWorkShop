import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderPartService from '../../service/OrderPartService';

// Асинхронный экшен для создания нового заказа части
export const createOrderPart = createAsyncThunk(
    'orderPart/createOrderPart',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await OrderPartService.createOrderPart(orderData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный экшен для получения всех заказов частей
export const fetchOrderParts = createAsyncThunk(
    'orderPart/fetchOrderParts',
    async (params, { rejectWithValue }) => {
        try {
            const response = await OrderPartService.getOrderParts(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный экшен для получения конкретного заказа части
export const fetchOrderPart = createAsyncThunk(
    'orderPart/fetchOrderPart',
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderPartService.getOrderPart(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteOrderPart = createAsyncThunk(
    'orderPart/deleteOrderPart',
    async (id, { rejectWithValue }) => {
        try {
            const response = await OrderPartService.deleteOrderPart(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const orderPartSlice = createSlice({
    name: 'orderPart',
    initialState: {
        orders: [],
        order: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrderPart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderPart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(createOrderPart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOrderParts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderParts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrderParts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOrderPart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderPart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.order = action.payload;
            })
            .addCase(fetchOrderPart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteOrderPart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteOrderPart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = state.orders.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrderPart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default orderPartSlice.reducer;
