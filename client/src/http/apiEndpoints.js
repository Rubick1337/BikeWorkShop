export const API_ENDPOINTS = {
    USER: {
        LOGIN: 'http://localhost:9005/api/user/login',
        LOGOUT: 'http://localhost:9005/api/user/logout',
        REGISTRATION: 'http://localhost:9005/api/user/registration',
        REFRESH: 'http://localhost:9005/api/user/refresh',
        GET_USER: (id) => `http://localhost:9005/api/user/${id}`, // Динамический путь
        GET_USERS: 'http://localhost:9005/api/user/',
    },
    BIKE:
        {
            GET: 'http://localhost:9005/api/bike',
            CATEGORIES: 'http://localhost:9005/api/categoryBike',
            TYPES: 'http://localhost:9005/api/typeBike',
        }
    //
};
