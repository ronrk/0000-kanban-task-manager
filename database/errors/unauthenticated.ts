import { StatusCodes } from 'http-status-codes';
import CustomApiError from './customApi';

class UnauthenticatedError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
