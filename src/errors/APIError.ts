import { HttpCodes } from '../enums';

class APIError extends Error {
    
    private readonly _errorCode: number;
    
    constructor(message: string, errorCode: number = HttpCodes.SERVER_ERROR) {
        super(message);
        this._errorCode = errorCode;
        Object.setPrototypeOf(this, APIError.prototype);
    }

    get status(): number {
        return this._errorCode;
    }

    getResponseObject = () => ({ status: this.status, Message: this.message });
}

export default APIError;