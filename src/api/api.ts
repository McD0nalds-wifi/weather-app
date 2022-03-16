import axios, { AxiosError, AxiosResponse } from 'axios'

import { ModelsRedux } from 'types'

export const API_URL = 'http://api.weatherapi.com/v1/'

export const instance = axios.create({
    withCredentials: false,
    baseURL: API_URL,
})

export const API = {
    apiGet: async <D, R>(
        url: string,
        data: D,
        success: (response: AxiosResponse<R>) => void,
        failure: (response: AxiosResponse<ModelsRedux.IError> | undefined) => void,
        mock: (
            success: (response: AxiosResponse<R>) => void,
            failure: (response: AxiosResponse<ModelsRedux.IError> | undefined) => void,
        ) => void,
        isMockEnabled: boolean,
    ) => {
        if (isMockEnabled) {
            mock(success, failure)
        } else {
            let apiData: string[] = []

            for (let key in data) {
                apiData.push(`${key}=${data[key]}`)
            }

            return instance
                .get(`${url}?${apiData.join('&')}`)
                .then((res: AxiosResponse<R>) => success(res))
                .catch((err: AxiosError<ModelsRedux.IError>) => failure(err.response))
        }
    },
}
