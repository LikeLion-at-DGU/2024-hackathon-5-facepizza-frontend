import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://facepizza-cheese.site',  
    //baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});