// src/service/BikeService.js
import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class BikeService {
    // Получение списка велосипедов
    static async fetchBikes({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit }) {
        const sortParam = sortOrder === 'expensive' ? 'desc' : 'asc';
        const response = await $api.get(API_ENDPOINTS.BIKE.GET, {
            params: {
                sortPrice: sortParam,
                searchQuery,
                id_category_bike: category,
                id_type_bike: type,
                minPrice,
                maxPrice,
                limit,
                page,
            }
        });
        return response.data;
    }

    // Получение категорий велосипедов
    static async fetchCategories() {
        const response = await $api.get(API_ENDPOINTS.BIKE.CATEGORIES);
        return response.data;
    }

    // Получение типов велосипедов
    static async fetchTypes() {
        const response = await $api.get(API_ENDPOINTS.BIKE.TYPES);
        return response.data;
    }
}
