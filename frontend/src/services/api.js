import axios from 'axios';
import server from '../environment.js';

const api = axios.create({
    baseURL: server,
    withCredentials: true,
    headers: {
        'Content-Type' : 'application/json',
    }
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response && error.response.status ===401) {
            console.log('unauthorized - redirecting to login');
            window.location.href = 'http://localhost:3000/auth';
            
        }

        return Promise.reject(error);
    }
);

export default api;