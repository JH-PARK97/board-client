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
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// strapi 사용으로 인해 주석처리
// client.interceptors.request.use(
//     (config) => {
//         // 로그인, 회원가입 페이지에선 header에 token 추가하지 않는다.
    
//         const accessToken = localStorage.getItem('accessToken');
//         const pathname = window.location.pathname;
//         const isAuthPage = pathname.includes('/signin') || pathname.includes('signup');

//         if (isAuthPage) return config;

//         // 그 외의 경우에는 토큰을 추가하고 토큰이 없을 시 로그인 페이지로 redirect
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         } else {
//             window.location.href = '/signin';
//         }

//         return config;
//     },
//     (error) => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

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
