import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class OrderPartService {
    // Создание нового заказа части велосипеда
    static async createOrderPart(orderData) {
        const response = await $api.post(API_ENDPOINTS.PART_ORDER.CREATE, orderData);
        return response.data;
    }

    // Получение всех заказов частей
    static async getOrderParts({ id_user, id_basket }) {
        const response = await $api.get(API_ENDPOINTS.PART_ORDER.GET, {
            params: { id_user, id_basket }
        });
        return response.data;
    }

    // Получение конкретного заказа части по id
    static async getOrderPart(id) {
        const response = await $api.get(API_ENDPOINTS.PART_ORDER.GET_ONE(id));
        return response.data;
    }
    static async deleteOrderPart(id) {
        const response = await $api.delete(API_ENDPOINTS.PART_ORDER.DELETE(id));
        return response.data;
    }
}
