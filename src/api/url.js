import axios from 'axios'

const BACKEND_URL = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`
})

export default BACKEND_URL