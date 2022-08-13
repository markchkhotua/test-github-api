export interface IApiErrors {
    getResponseObject: () => ErrorResponseObject
    status: number
}

type ErrorResponseObject = {
    status: number,
    Message: string
};
