// src/slice/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../service/UserService';

// Асинхронные действия для получения пользователей
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ page, limit }, rejectWithValue) => {
        try {
            const response = await UserService.fetchUsers({ page, limit });
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при загрузке пользователей');
        }
    }
);



// Асинхронные действия для обновления роли пользователя
export const updateUserRole = createAsyncThunk(
    'users/updateUserRole',
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const response = await UserService.updateUserRole(userId, role);
            console.log(userId + "dsadasdsadasdsawqewqe")
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка при обновлении роли');
        }
    }
);





const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
        totalCount: 0,
        status: 'idle',
        error: null,
        noUsersMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { rows, count } = action.payload;
                state.users = rows;
                console.log(state.users)
                state.totalCount = count;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.noUsersMessage = "Ошибка при загрузке пользователей";
            })

            .addCase(updateUserRole.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                state.users = state.users.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            })
    }
});

export default userSlice.reducer;
