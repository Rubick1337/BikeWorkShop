import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class OrderServiceService {
    // Создание нового заказа услуги
    static async createOrderService(orderData) {
        const response = await $api.post(API_ENDPOINTS.SERVICE_ORDER.CREATE, orderData);
        return response.data;
    }

    // Получение всех заказов услуг
    static async getOrderServices({ id_user, id_basket }) {
        const response = await $api.get(API_ENDPOINTS.SERVICE_ORDER.GET, {
            params: { id_user, id_basket }
        });
        return response.data;
    }

    // Получение конкретного заказа услуги по id
    static async getOrderService(id) {
        const response = await $api.get(API_ENDPOINTS.SERVICE_ORDER.GET_ONE(id));
        return response.data;
    }
    static async deleteOrderService(id) {
        const response = await $api.delete(API_ENDPOINTS.SERVICE_ORDER.DELETE(id));
        return response.data;
    }
}
