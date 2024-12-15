// src/service/UserService.js
import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class UserService {
    // Получение всех пользователей
    static async fetchUsers({ page, limit }) {
        const response = await $api.get(API_ENDPOINTS.USER.GET_USERS, {
            params: { page, limit },
        });
        return response.data;
    }
    // Обновление роли пользователя
    static async updateUserRole(userId, role) {
        console.log(userId + " запрос");
        const response = await $api.put(API_ENDPOINTS.USER.UPDATE_ROLE(userId), { role });
        console.log(userId + " запрос2");
        return response.data;
    }
}
