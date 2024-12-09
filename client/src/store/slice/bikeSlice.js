// src/slice/bikeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BikeService from '../../service/BikeService';

// Асинхронные действия для работы с велосипедами
export const fetchBikes = createAsyncThunk(
    'bikes/fetchBikes',
    async ({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit }, rejectWithValue) => {
        try {
            const response = await BikeService.fetchBikes({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit });
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке данных');
        }
    }
);

// Асинхронные действия для получения категорий
export const fetchCategories = createAsyncThunk(
    'bikes/fetchCategories',
    async (rejectWithValue) => {
        try {
            const response = await BikeService.fetchCategories();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке категорий');
        }
    }
);

// Асинхронные действия для получения типов
export const fetchTypes = createAsyncThunk(
    'bikes/fetchTypes',
    async (rejectWithValue) => {
        try {
            const response = await BikeService.fetchTypes();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке типов');
        }
    }
);

const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
        bikes: [],
        categories: [],
        types: [],
        totalCount: 0,
        status: 'idle',
        error: null,
        noBikesMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBikes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBikes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { rows, count } = action.payload;
                state.bikes = rows;
                state.totalCount = count;
                state.noBikesMessage = rows.length === 0 ? "Такого велосипеда нет в ассортименте" : "";
            })
            .addCase(fetchBikes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.noBikesMessage = "Ошибка при загрузке данных";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.types = action.payload;
            });
    }
});

export default bikeSlice.reducer;
