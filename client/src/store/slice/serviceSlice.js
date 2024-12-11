// src/slice/serviceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ServiceService from '../../service/ServiceWorkshopService';

// Асинхронные действия для получения услуг
export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async ({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit }, rejectWithValue) => {
        try {
            const response = await ServiceService.fetchServices({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit });
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке данных');
        }
    }
);

// Асинхронные действия для получения категорий
export const fetchCategories = createAsyncThunk(
    'services/fetchCategories',
    async (rejectWithValue) => {
        try {
            const response = await ServiceService.fetchCategories();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке категорий');
        }
    }
);

// Асинхронные действия для получения типов
export const fetchTypes = createAsyncThunk(
    'services/fetchTypes',
    async (rejectWithValue) => {
        try {
            const response = await ServiceService.fetchTypes();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке типов');
        }
    }
);

// Асинхронные действия для удаления услуги
export const fetchDeleteService = createAsyncThunk(
    'services/fetchDeleteService',
    async (id, { rejectWithValue }) => {
        try {
            const response = await ServiceService.fetchDeleteService(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при удалении услуги');
        }
    }
);

// Асинхронные действия для создания новой услуги
export const createService = createAsyncThunk(
    'services/createService',
    async (serviceData, { rejectWithValue }) => {
        try {
            const response = await ServiceService.createService(serviceData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при создании услуги');
        }
    }
);

// Асинхронные действия для редактирования услуги
export const fetchEditService = createAsyncThunk(
    'services/fetchEditService',
    async (serviceData, { rejectWithValue }) => {
        try {
            const response = await ServiceService.fetchEditService(serviceData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при редактировании услуги');
        }
    }
);

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        categories: [],
        types: [],
        totalCount: 0,
        status: 'idle',
        error: null,
        noServicesMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { rows, count } = action.payload;
                state.services = rows;
                state.totalCount = count;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.noServicesMessage = "Ошибка при загрузке данных";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.types = action.payload;
            })
            .addCase(fetchDeleteService.fulfilled, (state, action) => {
                state.services = state.services.filter(service => service.id !== action.payload.id);
                state.noServicesMessage = state.services.length === 0 ? "Услуг не найдено" : "";
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.services.push(action.payload);
                state.noServicesMessage = "";
            })
            .addCase(fetchEditService.fulfilled, (state, action) => {
                const updatedService = action.payload;
                state.services = state.services.map(service =>
                    service.id === updatedService.id ? updatedService : service
                );
            })
            .addCase(fetchEditService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default serviceSlice.reducer;
