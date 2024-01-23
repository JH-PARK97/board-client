import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosResponseHeaders,
    InternalAxiosRequestConfig,
} from 'axios';

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
}


export const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url } = config;
    // console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);
    // console.log(config);

    // console.log(config);
    // const token = getCookie(COOKIE_KEY.LOGIN_TOKEN);
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
    const { resultCd, data } = res.data;
    // console.log(method, url, code, message);
    // console.log('resultCd : ', resultCd, data);
    // if (code === 'SUCCESS') {
    //     console.log(`🛬 [API - RESPONSE] ${method?.toUpperCase()} ${url} | ${code} : ${message}`);
    // } else {
    //     console.log(`🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${code} : ${message}`);
    // }

    return res;
};

const onErrorRequest = (error: AxiosError<AxiosRequestConfig>) => {
    console.log('error : ', error);
    return error;
};

client.interceptors.request.use(onRequest, onErrorRequest);
client.interceptors.response.use(onResponse);

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
