import axios from 'axios';
import Logger from "./Logger";

const { REACT_APP_API_SERVER_BASE_URL } = process.env;
const client = axios.create({ baseURL: REACT_APP_API_SERVER_BASE_URL });

const onRequest = config => {
    const { headers, method, url, data } = config;
    Logger.network('axios ======================>', headers, method, url, data ?? '');
    return config;
};

const onResponseSuccess = response => {
    const { url } = response.config;
    const { status } = response;
    Logger.network('axios <======================', status, url, response.data);
    return response;
};

const onResponseRejected = error => {
    Logger.log('axios error', error.config?.url, error, error.response?.data ?? '');
    if (error.config) {
        return Promise.reject(error);
    }
};
client.interceptors.request.use(onRequest);
client.interceptors.response.use(onResponseSuccess, onResponseRejected);

export const request = ({ ...options }) => {
    const onSuccess = response => response;
    const onError = error => error;
    return client(options).then(onSuccess).catch(onError);
};
