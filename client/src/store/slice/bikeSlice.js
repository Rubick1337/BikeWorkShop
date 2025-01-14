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

export const createCategory = createAsyncThunk(
    'bikes/createCategory',
    async (name, { rejectWithValue }) => {
        try {
            const response = await BikeService.createCategory(name);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при создании категории');
        }
    }
);

// Создание нового типа велосипеда
export const createType = createAsyncThunk(
    'bikes/createType',
    async (name, { rejectWithValue }) => {
        try {
            const response = await BikeService.createType(name);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при создании типа');
        }
    }
);

export const fetchDeleteBike = createAsyncThunk(
    'bikes/fetchDeleteBike',
    async (id, { rejectWithValue }) => {  // Принимаем id
        try {

            const response = await BikeService.fetchDeleteBike(id);  // Передаем id в сервис
            return response;  // Возвращаем данные, если успешно
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при удалении велосипеда');
        }
    }
);
export const createBike = createAsyncThunk(
    'bikes/createBike',
    async (bikeData, { rejectWithValue }) => {
        try {
            const response = await BikeService.createBike(bikeData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при создании велосипеда');
        }
    }
);

export const fetchEditBike = createAsyncThunk(
    'bikes/fetchEditBike',
    async (bikeData, { rejectWithValue }) => {
        try {
            const response = await BikeService.fetchEditBike(bikeData);
            return response; // Возвращаем данные ответа
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при редактировании велосипеда');
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
            })
            .addCase(fetchDeleteBike.fulfilled, (state, action) => {
                state.bikes = state.bikes.filter(bike => bike.id !== action.payload.id);
            })
            .addCase(createBike.fulfilled, (state, action) => {
                state.bikes.push(action.payload);
                state.noBikesMessage = "";
            })
            .addCase(fetchEditBike.fulfilled, (state, action) => {
                const updatedBike = action.payload;
                state.bikes = state.bikes.map(bike =>
                    bike.id === updatedBike.id ? updatedBike : bike
                );
            })
            .addCase(fetchEditBike.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload); // Добавление новой категории
            })
            .addCase(createType.fulfilled, (state, action) => {
                state.types.push(action.payload); // Добавление нового типа
            });

    }
});

export default bikeSlice.reducer;
