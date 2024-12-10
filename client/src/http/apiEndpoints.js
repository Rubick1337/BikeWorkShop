export const API_ENDPOINTS = {
    USER: {
        LOGIN: 'http://localhost:9005/api/user/login',
        LOGOUT: 'http://localhost:9005/api/user/logout',
        REGISTRATION: 'http://localhost:9005/api/user/registration',
        REFRESH: 'http://localhost:9005/api/user/refresh',
        GET_USER: (id) => `http://localhost:9005/api/user/${id}`,
        GET_USERS: 'http://localhost:9005/api/user/',
    },
    BIKE:
        {
            GET: 'http://localhost:9005/api/bike',
            CATEGORIES: 'http://localhost:9005/api/categoryBike',
            TYPES: 'http://localhost:9005/api/typeBike',
            DELETE: (id) => `http://localhost:9005/api/bike/${id}`,
            CREATE:  'http://localhost:9005/api/bike',
            EDIT: (id) => `http://localhost:9005/api/bike/${id}`,
        },
    PART:
        {
            GET: 'http://localhost:9005/api/part',
            CATEGORIES: 'http://localhost:9005/api/categoryPart',
            TYPES: 'http://localhost:9005/api/typePart',
            DELETE: (id) => `http://localhost:9005/api/part/${id}`,
            CREATE:  'http://localhost:9005/api/part',
            EDIT: (id) => `http://localhost:9005/api/part/${id}`,
        }
};
