import axios, { AxiosInstance } from 'axios';
import APIError from '../errors/APIError';
import config from '../../config';
import type { GetUrlFunction, VCSInputData } from '../types';

abstract class AbstractVCSAPIService {

    protected client: AxiosInstance;

    protected constructor(baseURL: string = '') {
        this.client = axios.create({ baseURL });
        this.client.defaults.headers.common['Authorization'] = `token ${ config.accessToken }`;
        this.client.defaults.headers.common['Accept'] = 'application/vnd.github+json';
    }
    
    protected async getVCSData (
        inputData: VCSInputData,
        getUrl: GetUrlFunction
    ) {
        try {
            const { data } = await this.client.get(getUrl(inputData));
            return data;
        } catch (e: any) {
            throw new APIError(e.response.statusText, e.response.status);
        }
    }
}

export default AbstractVCSAPIService;
