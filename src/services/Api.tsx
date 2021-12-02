import axios from 'axios';
const porta: string = "5656"

export const api = axios.create({
    baseURL: `http://localhost:${porta}/`
})


