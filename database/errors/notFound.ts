import { StatusCodes } from 'http-status-codes';
import CustomApiError from './customApi';

class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
