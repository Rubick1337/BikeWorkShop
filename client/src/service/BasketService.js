import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class BasketService {
    static async createBasket(basketData) {
        const response = await $api.post(API_ENDPOINTS.BASKET.CREATE, basketData);
        return response.data;
    }

    // Получение всех корзин пользователя
    static async fetchBaskets({ userId, page, limit, order }) {

        const sortParam = order === 'expensive' ? 'desc' : 'asc';
        console.log(sortParam);
        const response = await $api.get(API_ENDPOINTS.BASKET.GET, {
            params: {
                userId,
                page,
                limit,
                order: sortParam
            }
        });
        return response.data;
    }

    // Получение пустой корзины пользователя
    static async fetchBasketNull(userId) {
        const response = await $api.get(API_ENDPOINTS.BASKET.GET_NULL(userId));
        return response.data;
    }

    // Редактирование корзины
    static async editBasket(basketId, basketData) {
        const response = await $api.put(API_ENDPOINTS.BASKET.EDIT(basketId), basketData);
        return response.data;
    }

    // Редактирование статуса корзины
    static async editBasketStatus(basketId, status) {
        const response = await $api.put(API_ENDPOINTS.BASKET.EDIT_STATUS(basketId), { status });
        return response.data;
    }
    static async fetchBasketItems(userId) {
        const response = await $api.get(API_ENDPOINTS.BASKET.GET_ITEMS(userId));
        return response.data;
    }
    static async placeOrder(userId, cost) {
        const response = await $api.post(API_ENDPOINTS.BASKET.PLACE_ORDER, { userId, cost });
        return response.data;
    }

}
