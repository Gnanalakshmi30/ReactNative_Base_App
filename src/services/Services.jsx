import axios from 'axios';
import { API_BASE_URL } from '@env';
import RNSecureStorage from 'rn-secure-storage';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    async (config) => {
        const token = await RNSecureStorage.exist('jwtToken') ? await RNSecureStorage.getItem('jwtToken') : null;        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/Login';
            }
        } else {
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

const apiRequest = async (method, url, data = {}, config = {}) => {
    try {
        console.log("apica",url);
        
        const response = await api[method](url, data, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


const Apis = {
    login: (payload) => apiRequest('post', '/account/login', payload),
    register: (payload) => apiRequest('post', '/account/register', payload),
    userList: (limit, page) => apiRequest('get', `/admin/getUserList?limit=${limit}&page=${page}`),
    approveUser: (payload) => apiRequest('put', '/admin/updateUserStatus', payload),
};

export default Apis;
