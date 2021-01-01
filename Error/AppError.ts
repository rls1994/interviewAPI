export default class AppError extends Error {
    httpStatusCode: number;
    data: any;

    constructor(message: string, httpStatusCode: number, data:any = null) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        this.data = data;
        
    }
    protected getMessage = () => this.message;
    protected getHttpStatusCode = () => this.httpStatusCode
}

/**
 *  401 Errors
 *  Auth Errors
 */
export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication Error') {
        super(message, 401)
    }
}


/**
 * 
 *  400 Errors
 *  Validation Error
 */
export class ValidationError extends AppError {
    constructor(message: string = 'Validation Error',data:any = null) {
        super(message, 400, data)
    }
}

export class MissingFieldError extends ValidationError {
    constructor(argument: string) {
        const message = `Required field ${argument} is missing`
        super(message)
    }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends AppError{
    constructor(message: string = "Not Found") {
        super(message,404)
    }
}

/**
 * 
 *  500 Errors
 *  Server Errors
 */
 export class InternalServerError extends AppError {
     constructor(message: string = 'Internal Server Error') {
         super(message, 500)
     }
 }

 /**
  * 
  * 422 Errors
  * Unprocessable Entity
  */
 export class OtherError extends AppError{
     constructor(message:string = 'Something Went Wrong'){
         super(message,422);
     }
 }