import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../errors';
import config from '../../config';
import type { AbstractGetVCSDataFunction } from '../types';

abstract class AbstractVcsApiService {

    protected client: AxiosInstance;

    protected constructor(baseURL: string = '') {
        this.client = axios.create({ baseURL });
        if(config.accessToken) {
            this.client.defaults.headers.common['Authorization'] = `token ${ config.accessToken }`;
        }
        // this.client.defaults.headers.common['Accept'] = 'application/vnd.github+json';
    }
    
    protected getVCSData: AbstractGetVCSDataFunction = async (url) => {
        try {
            const { data } = await this.client.get(url);
            return data;
        } catch (e: any) {
            throw new ApiError(e.response?.statusText
                || e.response?.data?.message, e.response?.status);
        }
    };
}

export default AbstractVcsApiService;
