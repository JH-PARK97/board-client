import axios, { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';

export interface APIResponse<T = any, D = any> {
    resultCd: number;
    resultMsg: string;
    data: T;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
}

export interface CommonResponse<T> {
    data: T;
    resultCd: number;
    token?: string;
}

export const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const Get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<CommonResponse<T>>> => {
    const response = await client.get(url, config);
    return response;
};

export const Post = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
    const response = await client.post(url, data, config);
    return response;
};
