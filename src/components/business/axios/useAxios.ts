import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthService from '../../../services/AuthService';

const URL = import.meta.env.VITE_BACKEND_URL;

async function getAuthHeaders() {
   try {
      const accessToken = await AuthService.accessToken();
      return {
         headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
         }
      };
   } catch (e) {
      console.log(e);
      return {};
   }
}

export function useAxios<T>() {
   const post = async (uri: string, data: any): Promise<T> => {
      const config = await getAuthHeaders();
      return axios.post<T>(URL + uri, data, config).then((res: AxiosResponse<T>) => {
         return res.data;
      });
   };

   const get = async (uri: string) => {
      const config = await getAuthHeaders();
      return axios.get<T>(URL + uri, config).then((res: AxiosResponse<T>) => {
         return res.data;
      });
   };

   const getHTML = async (uri: string) => {
      const config = await getAuthHeaders();
      const mergedConfig: AxiosRequestConfig = { ...config, responseType: 'text' };
      return axios.get<T>(URL + uri, mergedConfig).then((res: AxiosResponse<T>) => {
         return res.data;
      });
   };

   const put = async (uri: string, data: any): Promise<T> => {
      const config = await getAuthHeaders();
      return axios.put<T>(URL + uri, data, config).then((res: AxiosResponse<T>) => {
         return res.data;
      });
   };

   const del = async (uri: string) => {
      const config = await getAuthHeaders();
      return axios.delete<T>(URL + uri, config).then((res: AxiosResponse<T>) => {
         return res.data;
      });
   };

   return {
      post,
      get,
      getHTML,
      put,
      del
   };
}
