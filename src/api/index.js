import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://facepizza-cheese.site',
    headers: {
        'Content-Type': 'application/json',
    },
});