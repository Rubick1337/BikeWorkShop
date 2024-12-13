import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class OrderBikeService {
    // Создание нового заказа велосипеда
    static async createOrder(orderData) {
        const response = await $api.post(API_ENDPOINTS.BIKE_ORDER.CREATE, orderData);
        return response.data;
    }

    // Получение всех заказов
    static async getOrders({ id_user, id_basket }) {
        const response = await $api.get(API_ENDPOINTS.BIKE_ORDER.GET, {
            params: { id_user, id_basket }
        });
        return response.data;
    }

    // Получение конкретного заказа по id
    static async getOrder(id) {
        const response = await $api.get(API_ENDPOINTS.BIKE_ORDER.GET_ONE(id));
        return response.data;
    }
    static async deleteOrder(id) {
        const response = await $api.delete(API_ENDPOINTS.BIKE_ORDER.DELETE(id));
        return response.data;
    }
}
