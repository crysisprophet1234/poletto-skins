import { AxiosError } from 'axios'

interface IApiError {
    status: string
    timestamp: string
    message: string
    path: string
}

export type ApiError = AxiosError<IApiError>