// src/service/ServiceService.js
import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class ServiceService {
    static async fetchServices({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit }) {
        const sortParam = sortOrder === 'expensive' ? 'desc' : 'asc';
        const response = await $api.get(API_ENDPOINTS.SERVICE.GET, {
            params: {
                sortPrice: sortParam,
                searchQuery,
                id_category_service: category,
                id_type_service: type,
                minPrice,
                maxPrice,
                limit,
                page,
            }
        });
        return response.data;
    }

    static async fetchCategories() {
        const response = await $api.get(API_ENDPOINTS.SERVICE.CATEGORIES);
        return response.data;
    }

    static async fetchTypes() {
        const response = await $api.get(API_ENDPOINTS.SERVICE.TYPES);
        return response.data;
    }

    static async fetchDeleteService(id) {
        const response = await $api.delete(API_ENDPOINTS.SERVICE.DELETE(id));
        return response.data;
    }

    static async createService(serviceData) {
        const response = await $api.post(API_ENDPOINTS.SERVICE.CREATE, serviceData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Если требуется отправка файлов (например, изображений)
            }
        });
        return response.data;
    }

    static async fetchEditService(serviceData) {
        const formData = new FormData();
        formData.append('name', serviceData.name);
        formData.append('price', serviceData.price);
        formData.append('id_category_service', serviceData.id_category_service);
        formData.append('id_type_service', serviceData.id_type_service);
        formData.append('inSell', serviceData.inSell);
        formData.append('description', serviceData.description);

        if (serviceData.img) {
            formData.append('img', serviceData.img);  // Добавляем изображение, если оно есть
        }

        try {
            console.log("Отправляем запрос с id:", serviceData.id);
            const response = await $api.put(API_ENDPOINTS.SERVICE.EDIT(serviceData.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка при редактировании услуги:', error);
            throw error;
        }
    }
}
