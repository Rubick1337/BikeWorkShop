import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class PartService {

    static async fetchParts({ sortOrder, searchQuery, category, type, minPrice, maxPrice, page, limit }) {
        const sortParam = sortOrder === 'expensive' ? 'desc' : 'asc';
        const response = await $api.get(API_ENDPOINTS.PART.GET, {
            params: {
                sortPrice: sortParam,
                searchQuery,
                id_category_part: category,
                id_type_part: type,
                minPrice,
                maxPrice,
                limit,
                page,
            }
        });
        return response.data;
    }

    // Получение категорий деталей
    static async fetchCategories() {
        const response = await $api.get(API_ENDPOINTS.PART.CATEGORIES);
        return response.data;
    }

    // Получение типов деталей
    static async fetchTypes() {
        const response = await $api.get(API_ENDPOINTS.PART.TYPES);
        return response.data;
    }
    static async createCategory(name) {
        const response = await $api.post(API_ENDPOINTS.PART.CREATE_CATEGORY, { name });
        return response.data;
    }

    // Создание нового типа велосипеда
    static async createType(name) {
        const response = await $api.post(API_ENDPOINTS.PART.CREATE_TYPE, { name });
        return response.data;
    }

    // Удаление детали
    static async fetchDeletePart(id) {
        const response = await $api.delete(API_ENDPOINTS.PART.DELETE(id));  // Принимаем id и добавляем в URL
        return response.data;  // Возвращаем данные ответа
    }

    // Создание новой детали
    static async createPart(partData) {
        const response = await $api.post(API_ENDPOINTS.PART.CREATE, partData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }

    // Редактирование детали
    static async fetchEditPart(partData) {
        const formData = new FormData();
        formData.append('name', partData.name);
        formData.append('price', partData.price);
        formData.append('model', partData.model);
        formData.append('brand', partData.brand);
        formData.append('id_category_part', partData.id_category_part);
        formData.append('id_type_part', partData.id_type_part);
        formData.append('inSell', partData.inSell);

        if (partData.img) {
            formData.append('img', partData.img);
        }

        try {
            console.log("Отправляем запрос с id:", partData.id);
            const response = await $api.put(API_ENDPOINTS.PART.EDIT(partData.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка при редактировании детали:', error);
            throw error;
        }
    }
}
