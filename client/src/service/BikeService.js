// src/service/BikeService.js
import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class BikeService {
    // Получение списка велосипедов
    static async fetchBikes({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit }) {
        const sortParam = sortOrder === 'expensive' ? 'desc' : 'asc';
        console.log(category);
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

    // Создание новой категории
    static async createCategory(name) {
        const response = await $api.post(API_ENDPOINTS.BIKE.CREATE_CATEGORY, { name });
        return response.data;
    }

    // Создание нового типа велосипеда
    static async createType(name) {
        const response = await $api.post(API_ENDPOINTS.BIKE.CREATE_TYPE, { name });
        return response.data;
    }

    // Удаление велосипеда
    static async fetchDeleteBike(id) {
        console.log("dsasaddas"+id);
        const response = await $api.delete(API_ENDPOINTS.BIKE.DELETE(id));
        return response.data;
    }

    // Создание нового велосипеда
    static async createBike(bikeData) {
        const response = await $api.post(API_ENDPOINTS.BIKE.CREATE, bikeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

    // Редактирование велосипеда
    static async fetchEditBike(bikeData) {
        // Логируем ID
        console.log("ID для редактирования:", bikeData._id);
        console.log('Данные велосипеда для редактирования:', bikeData);

        const formData = new FormData();
        formData.append('name', bikeData.name);
        formData.append('description', bikeData.description);
        formData.append('price', bikeData.price);
        formData.append('model', bikeData.model);
        formData.append('brand', bikeData.brand);
        formData.append('id_category_bike', bikeData.id_category_bike);
        formData.append('id_type_bike', bikeData.id_type_bike);
        formData.append('inSell', bikeData.inSell);

        if (bikeData.img) {
            formData.append('img', bikeData.img);
        }

        try {
            const url = API_ENDPOINTS.BIKE.EDIT(bikeData._id); // Логируем URL
            console.log("URL для редактирования:", url);

            const response = await $api.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка при редактировании велосипеда:', error);
            throw error;
        }
    }
}
