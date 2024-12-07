import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../service/AuthService';
import { API_URL } from '../../http';
import axios from 'axios';

// Асинхронные действия
export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem('token', response.accessToken);
    return response;
});

// Регистрация с обработкой ошибок
export const registration = createAsyncThunk('auth/registration', async ({ email, password, name, surname, adress, role }, { rejectWithValue }) => {
    try {
        const response = await AuthService.registration(email, password, name, surname, adress, role);
        localStorage.setItem('token', response.accessToken);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Неизвестная ошибка");
    }
});

// Логаут
export const logout = createAsyncThunk('auth/logout', async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
});

// Проверка авторизации (обновление токена)
export const checkAuth = createAsyncThunk('auth/refresh', async () => {
    const response = await axios.get(`${API_URL}/user/refresh`, { withCredentials: true });
    localStorage.removeItem('token');
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
});

// Слайс для работы с состоянием auth
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: "",
            id: "",
            surname: "",
            email: "",
            adress: "",
            role: "клиент",
        },
        isAuth: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
            localStorage.setItem('isAuth', action.payload);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;  // Установка ошибки
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user; // Сохраняем информацию о пользователе
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.user = {
                    name: "",
                    id: "",
                    surname: "",
                    email: "",
                    adress: "",
                    role: "клиент",
                }; // Очищаем данные о пользователе
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user; // Сохраняем информацию о пользователе
                state.isLoading = false;
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isAuth = true; // Сразу авторизуем пользователя после успешной регистрации
                state.user = action.payload.user; // Сохраняем данные о пользователе
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(registration.rejected, (state, action) => {
                state.isAuth = false;
                state.user = {}; // Очищаем данные пользователя
                state.error = action.payload;  // Сохраняем ошибку в состояние
            });
    }
});

export const { setAuth, setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
