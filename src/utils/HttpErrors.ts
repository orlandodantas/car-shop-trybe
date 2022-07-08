import { CustomError } from '../interfaces/CustomError';
import StatusCodes from './StatusCodes';

export default class HttpErrors {
  public static BadRequest(message: string): CustomError {
    const error = new Error(message) as CustomError;
    error.statusCode = StatusCodes.BAD_REQUEST;

    return error;
  }

  public static NotFound(message: string): CustomError {
    const error = new Error(message) as CustomError;
    error.statusCode = StatusCodes.NOTFOUND;

    return error;
  }
}
