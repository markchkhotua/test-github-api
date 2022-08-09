import { Request } from 'express';

export type UrlBuilder = {
    [key: string]: UrlBuilderMethod
}

export type UrlBuilderMethod =  (data: UrlBuilderInput) => string

export type UrlBuilderInput = {
    [key: string]: string | number
}

export interface ExtendedRequest extends Request {
    swaggerDoc?: object
}