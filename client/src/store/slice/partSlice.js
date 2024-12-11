import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PartService from '../../service/PartService';

// Асинхронные действия для работы с деталями
export const fetchParts = createAsyncThunk(
    'parts/fetchParts',
    async ({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit }, rejectWithValue) => {
        try {
            const response = await PartService.fetchParts({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit });
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке данных');
        }
    }
);

// Асинхронные действия для получения категорий деталей
export const fetchCategories = createAsyncThunk(
    'parts/fetchCategories',
    async (rejectWithValue) => {
        try {
            const response = await PartService.fetchCategories();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке категорий');
        }
    }
);

// Асинхронные действия для получения типов деталей
export const fetchTypes = createAsyncThunk(
    'parts/fetchTypes',
    async (rejectWithValue) => {
        try {
            const response = await PartService.fetchTypes();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке типов');
        }
    }
);

// Удаление детали
export const fetchDeletePart = createAsyncThunk(
    'parts/fetchDeletePart',
    async (id, { rejectWithValue }) => {
        try {
            const response = await PartService.fetchDeletePart(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при удалении детали');
        }
    }
);

// Создание новой детали
export const createPart = createAsyncThunk(
    'parts/createPart',
    async (partData, { rejectWithValue }) => {
        try {
            const response = await PartService.createPart(partData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при создании детали');
        }
    }
);

// Редактирование детали
export const fetchEditPart = createAsyncThunk(
    'parts/fetchEditPart',
    async (partData, { rejectWithValue }) => {
        try {
            const response = await PartService.fetchEditPart(partData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при редактировании детали');
        }
    }
);

const partSlice = createSlice({
    name: 'part',
    initialState: {
        parts: [],
        categories: [],
        types: [],
        totalCount: 0,
        status: 'idle',
        error: null,
        noPartsMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchParts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchParts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { rows, count } = action.payload;
                state.parts = rows;
                state.totalCount = count;
            })
            .addCase(fetchParts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.noPartsMessage = "Ошибка при загрузке данных";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.types = action.payload;
            })
            .addCase(fetchDeletePart.fulfilled, (state, action) => {
                state.parts = state.parts.filter(part => part.id !== action.payload.id);
            })
            .addCase(createPart.fulfilled, (state, action) => {
                state.parts.push(action.payload);
                state.noPartsMessage = "";
            })
            .addCase(fetchEditPart.fulfilled, (state, action) => {
                const updatedPart = action.payload;
                state.parts = state.parts.map(part =>
                    part.id === updatedPart.id ? updatedPart : part
                );
            })
            .addCase(fetchEditPart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default partSlice.reducer;
