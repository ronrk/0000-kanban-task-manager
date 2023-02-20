import BadRequestError from './badRequest';
import CustomApiError from './customApi';
import NotFoundError from './notFound';
import UnauthenticatedError from './unauthenticated';
import UnauthorizedError from './unauthorized';

export const CustomError = {
  CustomApiError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
