import { HttpCodes } from '../enums';
import type { IApiErrors } from '../types/errors.types';

class ApiErrors extends Error implements IApiErrors {
    
    private readonly _errorCode: number;
    
    constructor(message: string, errorCode: number = HttpCodes.SERVER_ERROR) {
        super(message);
        this._errorCode = errorCode;
        Object.setPrototypeOf(this, ApiErrors.prototype);
    }

    get status() {
        return this._errorCode;
    }

    getResponseObject = () => ({ status: this._errorCode, Message: this.message });
}

export default ApiErrors;