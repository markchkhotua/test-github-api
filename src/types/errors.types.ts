export interface IApiErrors {
    getResponseObject: () => ErrorResponseObject
    status: number
}

export type ErrorResponseObject = {
    status: number,
    Message: string
};
