const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log('API_BASE_URL:', API_BASE_URL);

export const API_ENDPOINTS = {
    USER: {
        LOGIN: `${API_BASE_URL}api/user/login`,
        LOGOUT: `${API_BASE_URL}api/user/logout`,
        REGISTRATION: `${API_BASE_URL}api/user/registration`,
        REFRESH: `${API_BASE_URL}api/user/refresh`,
        GET_USER: (id) => `${API_BASE_URL}/api/user/${id}`,
        GET_USERS: `${API_BASE_URL}api/user/`,
    },
    BIKE: {
        GET: `${API_BASE_URL}api/bike`,
        CATEGORIES: `${API_BASE_URL}api/categoryBike`,
        TYPES: `${API_BASE_URL}api/typeBike`,
        DELETE: (id) => `${API_BASE_URL}api/bike/${id}`,
        CREATE: `${API_BASE_URL}api/bike`,
        EDIT: (id) => `${API_BASE_URL}api/bike/${id}`,
    },
    PART: {
        GET: `${API_BASE_URL}api/part`,
        CATEGORIES: `${API_BASE_URL}api/categoryPart`,
        TYPES: `${API_BASE_URL}api/typePart`,
        DELETE: (id) => `${API_BASE_URL}api/part/${id}`,
        CREATE: `${API_BASE_URL}api/part`,
        EDIT: (id) => `${API_BASE_URL}api/part/${id}`,
    },
    SERVICE: {
        GET: `${API_BASE_URL}api/service`,
        CATEGORIES: `${API_BASE_URL}api/categoryService`,
        TYPES: `${API_BASE_URL}api/typeService`,
        DELETE: (id) => `${API_BASE_URL}api/service/${id}`,
        CREATE: `${API_BASE_URL}api/service`,
        EDIT: (id) => `${API_BASE_URL}api/service/${id}`,
    }
};