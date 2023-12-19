import axios, {AxiosResponse} from "axios";
import AuthService from "../../../services/AuthService";

const URL = import.meta.env.VITE_BACKEND_URL

export function useAxios<T>() {
    const config = {
        headers: {
            "Authorization": `Bearer ${AuthService.accessToken()}`,
            "Content-Type": "application/json",
        },
    };

    const post = (uri: string, data: any): Promise<T> => {
        return axios
            .post<T>(
                URL + uri,
                data,
                config
            ).then((res: AxiosResponse<T>) => {
                return res.data
            })
    };

    const get = (uri: string) => {
        return axios
            .get<T>(
                URL + uri,
                config
            ).then((res: AxiosResponse<T>) => {
                return res.data
            })
    };

    const put = (uri: string, data: any): Promise<T> => {
        return axios
            .put<T>(
                URL + uri,
                data,
                config
            ).then((res: AxiosResponse<T>) => {
                return res.data
            })
    };

    const del = (uri: string) => {
        return axios
            .delete<T>(
                URL + uri,
                config
            ).then((res: AxiosResponse<T>) => {
                return res.data
            })
    };

    return {
        post,
        get,
        put,
        del
    };
}