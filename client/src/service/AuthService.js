import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class AuthService {
    static async login(email, password) {
        try {
            const response = await $api.post(API_ENDPOINTS.USER.LOGIN, { email, password });

            // Успешная авторизация
            const authResponse = {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                user: {
                    name: response.data.user.name,
                    id: response.data.user.id,
                    surname: response.data.user.surname,
                    email: response.data.user.email,
                    adress: response.data.user.adress,
                    role: response.data.user.role,
                },
            };
            return authResponse;
        } catch (error) {
            if (error.response) {
                // Ошибка от сервера
                console.error("Server Error:", error.response.data);
                throw new Error(error.response.data.message || "Неизвестная ошибка при авторизации");
            } else if (error.request) {
                // Ошибка при отправке запроса
                console.error("Request Error:", error.request);
                throw new Error("Не удалось установить соединение с сервером");
            } else {
                // Ошибка при настройке запроса
                console.error("Error:", error.message);
                throw new Error("Ошибка при настройке запроса");
            }
        }
    }

    async registration(email, password, name, surname, address, role) {
        try {
            const response = await $api.post(API_ENDPOINTS.USER.REGISTRATION, { email, password, name, surname, address, role });
            return response.data;
        } catch (error) {
            console.error("Register failed:", error);
            throw error;
        }
    }

    async logout() {
        try {
            const response = await $api.post(API_ENDPOINTS.USER.LOGOUT);
            return response.data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }
}
