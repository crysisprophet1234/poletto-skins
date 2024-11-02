import axios, { AxiosResponse } from 'axios'

const apiUrl = import.meta.env.VITE_POLETTO_SKINS_API_URL || process.env.POLETTO_SKINS_API_URL
const baseURL = `${apiUrl}/api`

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

type Params = Record<string, unknown>
type Data = Record<string, unknown>

export const get = async <T>(url: string, params?: Params): Promise<T> => {

    const response: AxiosResponse<T> = await api.get(url, { params })
    return response.data
}

export const post = async <T>(url: string, data?: Data): Promise<T> => {

    const response: AxiosResponse<T> = await api.post(url, data)
    return response.data
}

export const put = async <T>(url: string, data?: Data): Promise<T> => {

    const response: AxiosResponse<T> = await api.put(url, data)
    return response.data
}

export const del = async <T>(url: string): Promise<T> => {

    const response: AxiosResponse<T> = await api.delete(url)
    return response.data
}