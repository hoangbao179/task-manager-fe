
import axios, { AxiosError, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import { TOKEN } from "../../constants/common";


const onRequestSuccess = async (config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> => {
    const accessToken: any = localStorage.getItem(TOKEN);
    if (accessToken) {
        config.headers.set('Authorization', "Bearer " + accessToken);
    }
    return config;
};

const onResponseSuccess = (response: AxiosResponse): any => {
    return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {

        console.error(`Call api error: ${error}`);
        localStorage?.setItem("ERROR", `Call api error: ${JSON.stringify(error)}`);

    }
    return Promise.reject(error);
};

export const axiosRequest = axios.create();

axiosRequest.interceptors.request.use(onRequestSuccess);
axiosRequest.interceptors.response.use(
    onResponseSuccess,
    (error: AxiosError) => onResponseError(error)
);
