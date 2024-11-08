import axios, { AxiosResponse } from 'axios'

const apiUrl = import.meta.env.VITE_POLETTO_SKINS_API_URL || process.env.POLETTO_SKINS_API_URL
const baseURL = `${apiUrl}/api`

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(

    config => {

        const token = localStorage.getItem('jwt')

        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

type Params = Record<string, unknown>
type Data = Record<string, unknown>

export const get = async <T>(url: string, params?: Params, config = {}): Promise<T> => {

    const response: AxiosResponse<T> = await api.get(url, { params, ...config })
    return response.data
}

export const post = async <T>(url: string, data?: Data, config = {}): Promise<T> => {

    const response: AxiosResponse<T> = await api.post(url, data, { ...config })
    return response.data
}

export const put = async <T>(url: string, data?: Data, config = {}): Promise<T> => {

    const response: AxiosResponse<T> = await api.put(url, data, { ...config })
    return response.data
}

export const del = async <T>(url: string, config = {}): Promise<T> => {

    const response: AxiosResponse<T> = await api.delete(url, { ...config })
    return response.data
}