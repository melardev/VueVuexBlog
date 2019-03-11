const BASE_PATH = 'http://localhost:8080/api';
const ApiConfig = {
    urls: {
        base: BASE_PATH,
        articles: `${BASE_PATH}/articles`,
        comments: `${BASE_PATH}/comments`,
    }
};
const Constants = {
    USER_KEY: 'user',
};

export const environment = {
    ApiConfig,
    ...Constants
};
