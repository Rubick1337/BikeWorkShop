const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log('API_BASE_URL:', API_BASE_URL);

export const API_ENDPOINTS = {
    USER: {
        LOGIN: `${API_BASE_URL}api/user/login`,
        LOGOUT: `${API_BASE_URL}api/user/logout`,
        REGISTRATION: `${API_BASE_URL}api/user/registration`,
        REFRESH: `${API_BASE_URL}api/user/refresh`,
        GET_USERS: `${API_BASE_URL}api/user/`,
        UPDATE_ROLE: (id) => `${API_BASE_URL}api/user/${id}`,
    },
    BIKE: {
        GET: `${API_BASE_URL}api/bike`,
        CATEGORIES: `${API_BASE_URL}api/categoryBike`,
        TYPES: `${API_BASE_URL}api/typeBike`,
        DELETE: (id) => `${API_BASE_URL}api/bike/${id}`,
        CREATE: `${API_BASE_URL}api/bike`,
        EDIT: (id) => `${API_BASE_URL}api/bike/${id}`,
        CREATE_TYPE: `${API_BASE_URL}api/typeBike`,
        CREATE_CATEGORY: `${API_BASE_URL}api/categoryBike`,
    },
    PART: {
        GET: `${API_BASE_URL}api/part`,
        CATEGORIES: `${API_BASE_URL}api/categoryPart`,
        TYPES: `${API_BASE_URL}api/typePart`,
        DELETE: (id) => `${API_BASE_URL}api/part/${id}`,
        CREATE: `${API_BASE_URL}api/part`,
        EDIT: (id) => `${API_BASE_URL}api/part/${id}`,
        CREATE_TYPE: `${API_BASE_URL}api/typePart`,
        CREATE_CATEGORY: `${API_BASE_URL}api/categoryPart`,
    },
    SERVICE: {
        GET: `${API_BASE_URL}api/service`,
        CATEGORIES: `${API_BASE_URL}api/categoryService`,
        TYPES: `${API_BASE_URL}api/typeService`,
        DELETE: (id) => `${API_BASE_URL}api/service/${id}`,
        CREATE: `${API_BASE_URL}api/service`,
        EDIT: (id) => `${API_BASE_URL}api/service/${id}`,
        CREATE_TYPE: `${API_BASE_URL}api/typeService`,
        CREATE_CATEGORY: `${API_BASE_URL}api/categoryService`,
    },
    BASKET: {
        CREATE: `${API_BASE_URL}api/basket`,
        GET: `${API_BASE_URL}api/basket`,
        GET_NULL: (id) => `${API_BASE_URL}api/basket/${id}`,
        EDIT: (id) => `${API_BASE_URL}api/basket/${id}`,
        EDIT_STATUS: (id) => `${API_BASE_URL}api/basket/status/${id}`,
        GET_ITEMS: (id) => `${API_BASE_URL}api/basket/items/${id}`,
        PLACE_ORDER: `${API_BASE_URL}api/basket/place-order`,
    },
    BIKE_ORDER: {
        CREATE: `${API_BASE_URL}api/orderBike`,
        GET: `${API_BASE_URL}api/orderBike`,
        GET_ONE: (id) => `${API_BASE_URL}api/orderBike/${id}`,
        DELETE: (id) =>`${API_BASE_URL}api/orderBike/${id}`,
    },
    PART_ORDER: {
        CREATE: `${API_BASE_URL}api/orderPart`,
        GET: `${API_BASE_URL}api/orderPart`,
        GET_ONE: (id) => `${API_BASE_URL}api/orderPart/${id}`,
        DELETE: (id) => `${API_BASE_URL}api/orderPart/${id}`,
    },
    SERVICE_ORDER: {
        CREATE: `${API_BASE_URL}api/orderService`,
        GET: `${API_BASE_URL}api/orderService`,
        GET_ONE: (id) => `${API_BASE_URL}api/orderService/${id}`,
        DELETE: (id) => `${API_BASE_URL}api/orderService/${id}`,
    }
};