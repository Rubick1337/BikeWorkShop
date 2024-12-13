import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BasketService from '../../service/BasketService';
import BikeOrderService from '../../service/BikeOrderService';
import OrderPartService from '../../service/OrderPartService';
import ServiceOrder from '../../service/ServiceOrderService';

export const fetchBaskets = createAsyncThunk(
    'basket/fetchBaskets',
    async (params, { rejectWithValue }) => {
        try {
            const response = await BasketService.fetchBaskets(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchBasketNull = createAsyncThunk(
    'basket/fetchBasketNull',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await BasketService.fetchBasketNull(userId); // Передаем userId в сервис
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ошибка при получении корзины');
        }
    }
);
export const fetchBasketItems = createAsyncThunk(
    'basket/fetchBasketItems',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await BasketService.fetchBasketItems(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ошибка при загрузке товаров корзины');
        }
    }
);


export const createBasket = createAsyncThunk(
    'basket/createBasket',
    async (basketData, { rejectWithValue }) => {
        try {
            const response = await BasketService.createBasket(basketData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editBasket = createAsyncThunk(
    'basket/editBasket',
    async ({ basketId, basketData }, { rejectWithValue }) => {
        try {
            const response = await BasketService.editBasket(basketId, basketData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editBasketStatus = createAsyncThunk(
    'basket/editBasketStatus',
    async ({ basketId, status }, { rejectWithValue }) => {
        try {
            const response = await BasketService.editBasketStatus(basketId, status);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteBasketItem = createAsyncThunk(
    'basket/deleteBasketItem',
    async (item, { rejectWithValue }) => {
        try {
            // Проверяем, какой тип у объекта и отправляем запрос на сервер
            let response;
            if (item.Bike) {
                response = await BikeOrderService.deleteOrder(item.id);
            } else if (item.Part) {
                response = await OrderPartService.deleteOrderPart(item.id);
            } else if (item.Service) {
                response = await ServiceOrder.deleteOrderService(item.id);
            }

            return item.id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const placeOrder = createAsyncThunk(
    'basket/placeOrder',
    async ({ userId, cost }, { rejectWithValue }) => {
        console.log('placeOrder вызван с данными:', { userId, cost });  // Логируем перед отправкой
        try {
            const response = await BasketService.placeOrder(userId, cost);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ошибка при оформлении заказа');
        }
    }
);


const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        baskets: [],
        basketNull: null,
        basketItems: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearBasket: (state) => {
            state.basketItems = []; // Очищаем корзину
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBaskets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBaskets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.baskets = action.payload;
            })
            .addCase(fetchBaskets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchBasketNull.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasketNull.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.basketNull = action.payload;
            })
            .addCase(fetchBasketNull.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createBasket.fulfilled, (state, action) => {
                state.baskets.push(action.payload);
            })
            .addCase(editBasket.fulfilled, (state, action) => {
                const index = state.baskets.findIndex(basket => basket.id === action.payload.id);
                if (index !== -1) {
                    state.baskets[index] = action.payload;
                }
            })
            .addCase(editBasketStatus.fulfilled, (state, action) => {
                const index = state.baskets.findIndex(basket => basket.id === action.payload.id);
                if (index !== -1) {
                    state.baskets[index] = action.payload;
                }
            })
            .addCase(fetchBasketItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasketItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.basketItems = action.payload;
            })
            .addCase(fetchBasketItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteBasketItem.fulfilled, (state, action) => {
                state.basketItems = state.basketItems.filter(item => item.id !== action.payload);
            })
            .addCase(deleteBasketItem.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(placeOrder.pending, (state) => {
                state.status = 'loading'; // Статус "загрузка" при отправке запроса
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Статус "успех", если запрос успешен
                // Вы можете обновить состояние корзины или других данных, если нужно
                state.baskets = action.payload; // Пример обработки ответа
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed'; // Статус "ошибка", если запрос не удался
                state.error = action.payload; // Сохраняем ошибку в состояние
            });
    }
});
export const { clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
